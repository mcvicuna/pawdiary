var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var mongoose = require('mongoose');

router.post('/api/v1/dogs', function (req, res, next) {
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
        var dog = new Model.Dog(req.body);

        dog.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          user.dogs.push(dog);
          user.save(function (err) {
            if (err) {
              console.log(err);  // handle errors!
              return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
            }

            return res.json(dog);
          });
        });
      }
    });
  });
});

router.get('/api/v1/dogs', function (req, res, next) {
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

        return res.json(user.dogs);

      }
    });
  });
});

router.get('/api/v1/dogs/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Dog.findById(mongoose.Types.ObjectId(req.params.id), function (err, dog) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (dog === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
      } {

        return res.json({ dog: dog });

      }
    });
  });
});

router.post('/api/v1/dogs/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Dog.findById(mongoose.Types.ObjectId(req.params.id), function (err, dog) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (dog === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
      }
      else {
        Model.Dog.schema.eachPath(function (path) {
          if (req.body.hasOwnProperty(path)) {
            dog[path] = req.body[path];
          }
        });

        dog.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          console.log("dog " + req.param.id + " updated");
          return res.json(dog);
        });
      }
    });
  });
});


router.delete('/api/v1/dogs/:id', function (req, res, next) {
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
        var index = user.dogs.indexOf(mongoose.Types.ObjectId(req.params.id));
        if (index > -1) {
          user.dogs.splice(index, 1);
          user.save(function (err) {
            if (err) {
              console.log('trying to user after removing dog ' + req.params.id + ' ' + err);  // handle errors!
            }
          });
        }

        Model.Dog.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), {}, function (err, dog) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          else if (dog === null) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
          }
          else {
            res.json(dog);
          }
        });
      }
    });
  });
});

module.exports = router;
