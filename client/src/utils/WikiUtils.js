export default {
  // Executes the specified HTTP request and returns
  // a promise that resolves to the response
  requestViaHttpAndReturnPromise: async function(url, method, headers, body, errorByStatusCode = true) {
    headers['Content-Type'] = 'application/json';
    const returnValue = {
      request: {
        url,
        method,
        headers,
        body,
      },
      response: null,
      error: null,
    };
    try {
      // fetch the desired data
      let response;
      if (method === 'GET' || method === 'HEAD') {
        response = await fetch(url,{
          method,
          headers,
        });
      } else {
        response = await fetch(url,{
          method,
          headers,
          body: JSON.stringify(body),
        });
      }
      // wait for the response
      let responseBody = await response.text();

      try {
        responseBody = JSON.parse(responseBody)
      } catch (e) {
        // Do nothing -- just keep the body as text if it's not parseable.
      }

      // update the return value
      returnValue.response = {
        body: responseBody,
        status: response.status,
      };

      if (errorByStatusCode && response.status >= 400) {
        throw `error status code: ${response.status}`;
      }
    } catch(e) {
      // if anything goes wrong, update the error field
      returnValue.error = e;
      throw returnValue;
    }
    return returnValue;
  }
};
