var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var mongoose = require('mongoose');

router.post('/api/v1/trials', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.User.findOne({ 'data.oauth': req.user.data.oauth }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        var trial = new Model.Trial(req.body);

        trial.createdOn = Date.now();

        trial.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          return res.json(trial);
        });
      }
    });
  });
});

router.get('/api/v1/trials', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.User.findOne({ 'data.oauth': req.user.data.oauth }).exec(function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        // we have the dogs, now find the trials that go with the dogs
        Model.Trial.where('dog').in(user.dogs).populate('dog').exec(function (err, trials) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          else if (user === null) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
          }

          return res.json(trials);
        });

      }
    });
  });
});

router.get('/api/v1/trials/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Trial.findById(mongoose.Types.ObjectId(req.params.id), function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      } {

        return res.json({ trial: trial });

      }
    });
  });
});

router.post('/api/v1/trials/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Trial.findById(mongoose.Types.ObjectId(req.params.id), function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      }
      else {
        Model.Trial.schema.eachPath(function (path) {
          if (req.body.hasOwnProperty(path)) {
            trial[path] = req.body[path];
          }
        });

        trial.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          console.log("trial " + req.param.id + " updated");
          return res.json(trial);
        });
      }
    });
  });
});


router.delete('/api/v1/trials/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Trial.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), {}, function (err, trial) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (trial === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'trial unknown ' + req.params.id });
      }
      else {
        res.json(trial);
      }
    });
  });
});

module.exports = router;
