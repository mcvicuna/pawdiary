function setupAuth(Model, Config, app, wagner) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var FacebookTokenStrategy = require('passport-facebook-token');

  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Model.Users.get({ id : id }, function(err, user) {
      if ( err ) {
        done(err,null);      
      }
      else {
        done(null,user.attrs);
      }
    });
  });

  // Facebook-specific
   function facebook_login(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account!');
      }
      Model.Users.query(profile.id).usingIndex('fb_index').exec(function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        } 
        else if (user !== null  && user.Count > 1) {
          return done('to many accounts associated with thie FB account');
        }
        else if (user !== null  && user.Count == 1) {
          Model.Users.update(
            {
               id: user.Items[0].get('id'), 
               fb_email: profile.emails[0].value,
               fb_token: accessToken,
               picture: 'http://graph.facebook.com/' +
                  profile.id.toString() + '/picture?type=large'
            }, function(err, user) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log('update account', user.get('fb_email'));
                done(null, user.attrs);
              }
               
            });
        } else {
          user = new Model.Users({
            fb_id: profile.id,
            email: profile.emails[0].value,
            picture: 'http://graph.facebook.com/' +
                  profile.id.toString() + '/picture?type=large'
              });
          user.save(function(err) {
              if(err) {
                console.log(err);  // handle errors!
              } else {
                console.log("saving user ...", user.get('fb_email'));
                done(null, user.attrs);
              }
            });
          }
      });
  }

  passport.use(new FacebookStrategy(
    {
      clientID: Config.facebookClientId,
      clientSecret: Config.facebookClientSecret,
      callbackURL: Config.facebookCallback,
      enableProof: true,
      // Necessary for new version of Facebook graph API
      profileFields: ['id', 'emails', 'name']
    },
    facebook_login
  ));

  // for token based authorizing
  passport.use(new FacebookTokenStrategy({
    clientID: Config.facebookClientId,
    clientSecret: Config.facebookClientSecret,
    },
    facebook_login 
  ));    

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
      if ( req.user ) {
        res.redirect('/#/');
      }
      else {
        res.send(401);
      }
    });

  app.get('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    function (req, res) {
      if ( req.user ) {
        res.redirect('/#/');
      }
      else {
        res.send(401);
      }
    }
  );    
}

module.exports = setupAuth;
