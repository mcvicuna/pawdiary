var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var _ = require('lodash');
var async = require('async');



router.get('/api/v1/summary', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
        if("dogs" in req.user) {
          Model.Dog.getItems(req.user.dogs,function(err, dogs) {
            if (err) {
              console.log(err);  // handle errors!
              return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
            }

            var results = dogs.map(function(dog) {
              return dog.get();
            });

            // we have the dog now find the trials of the default difficulty
            retVal = [];
            var recalc_results = results.filter(function(dog) {
              return dog.difficulty.localeCompare(dog.summary_difficulty) !== 0;
            });
            var cached_results = results.filter(function(dog) {
                return dog.difficulty.localeCompare(dog.summary_difficulty) === 0;
            });
            cached_results.forEach(function(dog){
              retVal.push({dog: dog, qq:dog.summary_qq+dog.qq, points:dog.summary_points+dog.points});
            });
            
            streams = recalc_results.map(function(dog) {
                  return {stream:Model.Trial.query(dog.id).usingIndex('date_index').descending().loadAll().exec(), dog:dog};
              });

              async.mapLimit(streams, 2, function(pair, callback) {
                var trials = [];
                pair.stream.on('error', function (err) {
                  console.log('error ' + err);
                  callback(err);
                });

                pair.stream.on('readable', function () {
                  var items = pair.stream.read();
                  if ( items ) {
                    items.Items.forEach(function(trial) {
                      trial = trial.get();
                      trial.date = new Date(trial.date);
                      trials.push(trial);
                    });
                  }
                });

                pair.stream.on('end', function () {
                  var summary = { dog: pair.dog, qq: 0, points: 0 };
                  trials = trials.filter(function(trial) {
                    return trial.difficulty === pair.dog.difficulty;
                  });

                  if ( trials.length > 0) {
                    var lastDate = new Date(0);
                    trials.forEach(function (trial) {
                      if (!trial.nq) {
                        summary.points += trial.points;
                        if (lastDate.getMonth() == trial.date.getMonth() &&
                          lastDate.getDate() == trial.date.getDate() &&
                          lastDate.getFullYear() == trial.date.getFullYear()) {
                          summary.qq += 1;
                          // reset the lastDate since you can't have get two double qualifies in a day without
                          // having 4 trials. 
                          // this is still flawed since it doesn't check to make sure they were different classes
                          // but baring user input error should work.
                          lastDate.setDate(0);
                        }
                        else {
                          lastDate = trial.date;
                        }
                      }
                    });
                  }

                  Model.Dog.update({id:pair.dog.id, summary_difficulty: pair.dog.difficulty, summary_qq : summary.qq, summary_points: summary.points}, function(err,result) {
                      if (err) {
                        console.log(err);  // handle errors!
                      }
                  });
                  callback(null,summary);
              });
              }, function(err,summaries) {
                if (err) {
                  console.log(err);  // handle errors!
                  return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
                }

                summaries = summaries.map(function(summary) {
                  summary.qq += summary.dog.qq;
                  summary.points += summary.dog.points;
                  return summary;
                });

                Array.prototype.push.apply(retVal,summaries);

                return res.json(retVal);
              });            
            
          });
        }
        else {
          return res.json([]);
        }
    });
});


router.get('/api/v1/summary/:dog/:difficulty', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.User.findOne({ 'data.oauth': req.user.data.oauth }).populate('dogs').exec(function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        var dog = user.dogs.filter(function (value) {
          return value.id.equals(mongoose.Types.ObjectId(req.params.dog));
        });
        if (dog.length != 1) {
          return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'to many dogs ' + req.params.dog });
        }
        // we have the dog now find the trials of the specific difficulty
        Model.Trial.where('dog').equals(dog[0]).where('difficulty').equals(req.params.difficulty).sort({ date: -1 }).exec(function (err, trials) {
          var retVal = { dog: dog[0], qq: 0, points: 0 };
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          else if (trials) {
            var lastDate = new Date(0);
            trials.forEach(function (trial) {
              if (!trial.nq) {
                retVal.points += trial.points;
                if (lastDate.getMonth() == trial.date.getMonth() &&
                  lastDate.getDate() == trial.date.getDate() &&
                  lastDate.getFullYear() == trial.date.getFullYear()) {
                  retVal.qq += 1;
                  // reset the lastDate since you can't have get two double qualifies in a day without
                  // having 4 trials. 
                  // this is still flawed since it doesn't check to make sure they were different classes
                  // but baring user input error should work.
                  lastDate.setDate(0);
                }
                else {
                  lastDate = trial.date;
                }
              }
            }, this);
          }
          return res.json(retVal);
        });
      }
    });
  });
});

module.exports = router;
