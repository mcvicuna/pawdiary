var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var mongoose = require('mongoose');



router.get('/api/v1/summary', function (req, res, next) {
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

        // we have the dog now find the trials of the default difficulty

        var queries = user.dogs.map(function (dog) {
          return Model.Trial.where('dog').equals(dog._id).where('difficulty').equals(dog.difficulty).sort({ date: -1 }).exec();
        });

        Promise.all(queries).then(function (resolvedQueiries) {
          var retVal = resolvedQueiries.map(function (trials) {
            var summary = { dog: 0, qq: 0, points: 0 };
            if (trials && trials.length > 0) {
              var dog = user.dogs.filter(function (value) {
                return value._id.equals(trials[0].dog);
              });
              summary.dog = dog[0];
              summary.qq = summary.dog.qq;
              summary.points = summary.dog.points;
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
              }, this);
            }
            return summary;
          });
          return res.json(retVal);
        }, function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
        });
      }
    });
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
          return value._id.equals(mongoose.Types.ObjectId(req.params.dog));
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
