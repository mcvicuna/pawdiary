var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var mongoose = require('mongoose');
var Joi = require('joi');
var UUID = require('uuid');

router.post('/api/v1/dogs', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model,Schema) {
    Model.Users.get({ id : req.user.id }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        filtered_dog = {};
        Object.keys(Schema.Dog).forEach(function(key) {
          if ( key in req.body)
            filtered_dog[key] = req.body[key]; 
        });

        filtered_dog.owner = req.user.id;
        valid = Joi.validate(filtered_dog,Schema.Dog);
        if (valid.error) {
            console.log(valid.error);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: valid.error });
        }

        var dog = new Model.Dog(filtered_dog);
        if(!("dogs" in user.attrs)) {
          user.attrs.dogs = [];
        }
        user.attrs.dogs.push(dog.get('id'));
        user.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
        

            dog.save(function (err) {
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
    Model.Users.get({ id : req.user.id }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        if("dogs" in user.attrs) {
          Model.Dog.getItems(req.user.dogs,function(err, dogs) {
            if (err) {
              console.log(err);  // handle errors!
              return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
            }

            results = dogs.map(function(dog) {
              return dog.attrs;
            });        

            return res.json(results);
          });
        }
        else {
          return res.json([]);
        }
      }
    });
  });
});

router.get('/api/v1/dogs/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Dog.get((req.params.id), function (err, dog) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (dog === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
      } {

        return res.json({ dog: dog.attrs });

      }
    });
  });
});

router.post('/api/v1/dogs/:id', function (req, res, next) {
  if ( typeof req.user === "undefined") {
    return next({ status: status.UNAUTHORIZED });
  }
  wagner.invoke(function (Model) {
    Model.Dog.get((req.params.id), function (err, dog) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (dog === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
      }
      else {
        if ( dog.attrs.owner != req.user.id ) 
          return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog not owned ' + req.user.id });
        Model.Dog.update(req.body, function (err) {
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
    Model.Users.get({ id : req.user.id }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
      }
      else if (user === null) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'user unknown ' + req.user });
      }
      else {
        var index = user.attrs.dogs.indexOf(req.params.id);
        if (index > -1) {
          user.attrs.dogs.splice(index, 1);
          user.save(function (err) {
            if (err) {
              console.log('trying to user after removing dog ' + req.params.id + ' ' + err);  // handle errors!
            }
          });
        }

        Model.Dog.destroy(req.params.id, { ReturnValues: "ALL_OLD", expected: {owner: req.user.id}}, function (err, dog) {
          if (err) {
            console.log(err);  // handle errors!
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
          }
          else if (dog === null) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: 'dog unknown ' + req.params.id });
          }
          else {
            res.json(dog.attrs);
          }
        });
      }
    });
  });
});

module.exports = router;
