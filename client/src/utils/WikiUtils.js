export default {
  // Executes the specified HTTP request and returns
  // a promise that resolves to the response
  requestViaHttpAndReturnPromise: function(url, method, headers, body) {
    if (body) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
    return fetch(url,{
      method,
      headers,
      body,
    }).then((response) => {
      if (response.status >= 400) {
        // TODO: Make this less horrifyingly terrible
        throw {
          error: 'invalid status',
          pageData: {
            status: response.status,
          },
        };
      }
      return response.json();
    });
  }
};
