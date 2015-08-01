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
