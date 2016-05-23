function setupAuth(Model, Config, app, wagner) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Model.User.
      findOne({ _id : id }).
      exec(done);
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {

      clientID: Config.facebookClientId,
      clientSecret: Config.facebookClientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      // Necessary for new version of Facebook graph API
      profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account!');
      }

      Model.User.findOne({ 'data.oauth': profile.id }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        else if (user !== null) {
          Model.User.findOneAndUpdate(
            { 'data.oauth': profile.id },
            {
              $set: {
                'logOn': Date.now(),
                'profile.username': profile.emails[0].value,
                'profile.picture': 'http://graph.facebook.com/' +
                  profile.id.toString() + '/picture?type=large'
              }
            },
            { 'new': true, upsert: true, runValidators: true },
            function(error, user) {
              done(error, user);
            });
        } else {
          user = new Model.User({
            'logOn': Date.now(),
            'createdOn': Date.now(),
            'data.oauth': profile.id,
            'profile.username': profile.emails[0].value,
            'profile.picture': 'http://graph.facebook.com/' +
                  profile.id.toString() + '/picture?type=large'
              });
          user.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log("saving user ...");
                done(null, user);
              }
            });
          }
        });
    }));

  // Express middlewares
  app.use(require('express-session')({
    secret: Config.sessionSecret
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/fail' }),
    function(req, res) {
      res.redirect('/#/');
    });
}

module.exports = setupAuth;
