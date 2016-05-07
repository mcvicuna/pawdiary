var express = require('express');
var router = express.Router();
var wagner = require('wagner-core');
var status = require('http-status');
var mongoose = require('mongoose');

router.post('/api/v1/dogs', function(req, res, next) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }
    wagner.invoke(function(Model) {

      Model.User.findOne({ 'data.oauth': req.user.data.oauth }, function(err, user) {
        if(err ) {
          console.log(err);  // handle errors!
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:err});
        }
        else if (user === null) {
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:'user unknown '+req.user});
        }
        else {
          var dog = new Model.Dog();

          dog.name = req.body.name;
          dog.owner = user._id;
          dog.createdOn = Date.now();

          dog.save(function(err){
            if (err) {
              console.log(err);  // handle errors!
              return res.status(status.INTERNAL_SERVER_ERROR).json({error:err});
            }
            user.dogs.push(dog);
            user.save(function(err){
              if (err) {
                console.log(err);  // handle errors!
                return res.status(status.INTERNAL_SERVER_ERROR).json({error:err});
              }

              return res.json(dog);
            });
          });
        }
    });
  });
});

router.get('/api/v1/dogs', function(req, res, next) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }
    wagner.invoke(function(Model) {
      Model.User.findOne({ 'data.oauth': req.user.data.oauth }).populate('dogs').exec(function(err, user) {
        if(err ) {
          console.log(err);  // handle errors!
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:err});
        }
        else if (user === null) {
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:'user unknown '+req.user});
        }
        else {

        return res.json({ dogs: user.dogs });

        }
    });
  });
});

router.get('/api/v1/dogs/:id', function(req, res, next) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }
    wagner.invoke(function(Model) {
      Model.Dog.findById(mongoose.Types.ObjectId(req.params.id), function(err, dog) {
        if(err ) {
          console.log(err);  // handle errors!
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:err});
        }
        else if (dog === null) {
          return res.status(status.INTERNAL_SERVER_ERROR).json({error:'dog unknown '+req.params.id});
        } {

        return res.json({ dog: dog });

        }
    });
  });
});

module.exports = router;
