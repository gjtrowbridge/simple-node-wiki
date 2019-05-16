export default {
  // Executes the specified HTTP request and returns
  // a promise that resolves to the response
  requestViaHttpAndReturnPromise: function(url, method, headers, body) {
    return fetch(url,{
      method,
      headers,
      body,
    });
  }
};
