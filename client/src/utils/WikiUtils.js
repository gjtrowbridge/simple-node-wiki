// This require causes warnings in chrome...not a big deal,
// just marking this as the cause in case I want to fix this
// later.
var rp = require('request-promise');

module.exports = {
  // Executes the specified HTTP request and returns
  // a promise that resolves to the response
  requestViaHttpAndReturnPromise: function(url, httpVerb, jsonData) {
    return rp({
      uri: url,
      method: httpVerb,
      json: jsonData
    }).then(function(response) {
      return JSON.parse(response);
    });
  }
};
