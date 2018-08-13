var express = require('express');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var db = require('../database/models/index.js');
var helpers = require('./helpers');

var algorithm = 'HS512';

var initializeAuth = function(
  authRouterRootURL,
  clientId,
  clientSecret,
  isProduction,
  secretKeyJWT
) {
  const authRouter = express.Router();

  if (isProduction) {
    // Set up Google OAuth strategy on passport module
    passport.use(new GoogleStrategy(
      {
        clientID: clientId,
        clientSecret,
        callbackURL: `${authRouterRootURL}/google/callback`,
        scope: ['email'],
      },
      function (accessToken, refreshToken, profile, cb) {
        let email = null;
        if (profile.emails.length >= 1) {
          email = profile.emails[0].value;
        }
        return helpers.findOrCreateUserAfterGoogleAuth(
          profile.id,
          email,
          cb
        );
      }
    ));
  }

  // Set up JWT strategy on passport module
  passport.use(new passportJWT.Strategy(
    {
      secretOrKey: secretKeyJWT,
      jwtFromRequest: passportJWT.ExtractJwt.fromHeader('jwt'),
      algorithms: [ algorithm ],
      passReqToCallback: false,
    },
    function (jwtPayload, done) {
      const returnIfError = new Error(`could not get user from JWT, user id: ${jwtPayload.id}`);
      db.User.findById(jwtPayload.id).then(function(user) {
        if (!user) {
          done(returnIfError, null);
        } else {
          done(null, user);
        }
      }).catch(function(err) {
        console.log(err);
        done(returnIfError, null);
      });
    }
  ));
  const getRedirectHTMLWithEmbeddedJWT = function(jwt) {
    return `
    <html>
      <script>
        // Save JWT to localStorage
        window.localStorage.setItem('jwt', '${jwt}');
        // Redirect browser to root of application
        window.location.href = '/';
      </script>
    </html>
    `
  };

  // Set up endpoint where google redirects users after successful auth
  authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    function (req, res) {
      const jwt = helpers.createJWTFromUser(req.user, secretKeyJWT, algorithm);
      res.send(getRedirectHTMLWithEmbeddedJWT(jwt));
    }
  );

  return {
    authRouter,
    addUserToReqMiddleware: function(req, res, next) {
      if (isProduction) {
        return passport.authenticate('jwt', {session: false})(req, res, next);
      } else {
        // If on a local, dev, or other non-production environment, allow auto-login
        // without JWT or Google OAuth
        helpers.findOrCreateUserAfterGoogleAuth(
          '1',
          'user@localhost',
          function(error, user) {
            req.user = {
              id: user.id,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            };
            if (error) {
              res.status(500).send(error);
            } else {
              next();
            }
          }
        );
      }
    }
  };
};

module.exports = initializeAuth;
