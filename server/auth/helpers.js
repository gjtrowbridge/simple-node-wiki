var db = require('../database/models/index.js');
const jsonwebtoken = require('jsonwebtoken');

var helpers = {};

helpers.createJWTFromUser = (user, secretKey, algorithm) => {
  const payload = {
    id: user.id,
  };
  return jsonwebtoken.sign(payload, secretKey, {
    algorithm,
  });
};

helpers.findOrCreateUserAfterGoogleAuth = function(
  googleId,
  googleEmail,
  doneCallback
) {
  // If google user id is missing, return an error
  if (!googleId) {
    const err = new Error(`cannot findOrCreate user: no google id provided`);
    doneCallback(err, null);
  }

  // If google user email is missing, return an error
  if (!googleEmail) {
    const err = new Error(`cannot findOrCreate user: no google email provided`);
    doneCallback(err, null);
  }

  // Create user record to insert into database
  const userRecord = {
    email: googleEmail,
  };

  // FindOrCreate a user with the given google ID
  db.User.findOrCreate({
    where: {
      email: userRecord.email,
    },
    defaults: userRecord,
  }).then(([user, created]) => {
    // If the user already exists, update the lastLoggedInAt
    if (!created) {
      return user.save().then(() => {
        return user;
      });
    }
    return user;
  }).then((user) => {
    // Finish by sending back the user model
    return doneCallback(null, user);
  });
};

module.exports = helpers;
