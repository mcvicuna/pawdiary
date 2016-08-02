var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var async = require('async');

router.post('/api/v1/trials', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model, Schema) {
      filtered_trial = {};
      Object.keys(Schema.Trial).forEach(function(key) {
        if ( key in req.body)
          filtered_trial[key] = req.body[key]; 
      });
      var trial = new Model.Trial(filtered_trial);

      trial.save(function (err) {
        if (err) {
          console.log(err);  // handle errors!
          return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
        }
        Model.Dog.get(trial.get('dog'),function(err, dog) {
          if ( err ) {
              console.log(err);  // handle errors!
          }
          dog.set({summary_difficulty:'dirty'});
          dog.update(function(err) {
            if ( err ) {
                console.log(err);  // handle errors!
            }
          });
        });
        return res.json(trial);
      });
  });
});

router.get('/api/v1/trials', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    streams = req.user.dogs.map(function(dog) {
        return Model.Trial.query(dog).usingIndex('date_index').descending().limit(req.user.dog_trial_limit).exec();
    });

    var trials = [];

    async.forEachLimit(streams, 2, function(trialStream, callback) {
      trialStream.on('error', function (err) {
        console.log('error ' + err);
        callback(err);
      });

      trialStream.on('readable', function () {
        var items = trialStream.read();
        if ( items ) {
          items.Items.forEach(function(trial) {
            trials.push(trial.attrs);
          });
        }
      });

      trialStream.on('end', function () {
        callback();
      });
    }, function(err) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      return res.json(trials);
    });
  });
});

router.get('/api/v1/trials/:dog/:id/', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model,Schema) {
    Model.Trial.get({dog : req.body.dog, id:req.params.id}, function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      }
      else {
       
          return res.json(trial.attrs);
      }
    });
  });
});

router.post('/api/v1/trials/:dog/:id/', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model,Schema) {
    Model.Trial.get({dog : req.body.dog, id:req.params.id}, function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      }
      else {
        filtered_trial = {};
        Object.keys(Schema.Trial).forEach(function(key) {
          if ( key in req.body)
            filtered_trial[key] = req.body[key]; 
        }); 

        Model.Trial.update(filtered_trial, function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          Model.Dog.get(trial.get('dog'),function(err, dog) {
          if ( err ) {
              console.log(err);  // handle errors!
          }
          dog.set({summary_difficulty:'dirty'});
          dog.update(function(err) {
            if ( err ) {
                console.log(err);  // handle errors!
            }
          });
        });      
          console.log("trial " + req.param.id + " updated");
          return res.json(trial);
        });
      }
    });
  });
});


router.delete('/api/v1/trials/:dog/:id/', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Trial.destroy({dog : req.params.dog, id : req.params.id}, {ReturnValues: "ALL_OLD"}, function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      }
      else {
        Model.Dog.get(trial.get('dog'),function(err, dog) {
          if ( err ) {
              console.log(err);  // handle errors!
          }
          dog.set({summary_difficulty:'dirty'});
          dog.update(function(err) {
            if ( err ) {
                console.log(err);  // handle errors!
            }
          });
        });        
        res.json(trial.attrs);
      }
    });
  });
});

module.exports = router;
