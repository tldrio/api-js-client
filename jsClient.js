/**
 * Javascript client for the tldr.io API
 * MIT License, tldr.io
 *
 */

  /**
   * Create a new client for the tldr.io API
   * @param {Object} options Object containing the credentials
   *                           name: api client name
   *                           key: api client key
   */
  function Client (options) {
    if (!options) { throw 'Missing options'; }
    if (!options.name) { throw 'Missing API client name'; }
    if (!options.key) { throw 'Missing API client key'; }

    this.name = options.name;
    this.key = options.key;
    this.apiUrl = 'https://api.tldr.io';
  };

  /**
   * Get resource
   * @param {String} url URL to retrieve
   * @param {String} method HTTP method to use
   * @param {Object} options Optional object when additional data is needed. Only one possible field for now:
   *                         'options.data', which contains data to be sent with a POST request
   * @param {Function} callback Will be called after the request is processed. Signature err, tldrs
   *                            err is a message explaining the error, or null if no error
   *                            tldrs is an array of the retrieved tldrs or an object if tldrs.length == 1
  */
  Client.prototype.callURL = function (url, method, options, callback){
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    $.ajax({ type: method
             , url: url
             , data: options.data || ""
             , headers: { 'api-client-name': this.name,
                          'api-client-key': this.key
                      }
             })
    .done(function (data) { callback(null, data); })
    .fail(function (jqxhr) {
      if (jqxhr.status === 404) { return callback('URL not found'); }
      if (jqxhr.status === 401) { return callback(jqxhr.responseText); }

      return callback('An unknown error happened');
    });
  };

  /**
   * Fetch the latest tldrs
   * GET /tldrs/latest/:number
   * @param {Object} number How many latest tldrs to fetch (max possible is 10)
   * @param {Function} callback Will be called after request is processed. Signature: err, tldrs
   *                            err is a message explaining the error, or null if no error
   *                            tldrs is an array of the retrieved tldrs
   *
   */
  Client.prototype.getLatestTldrs = function (number, callback) {
    var url = this.apiUrl + '/tldrs/latest/' + number,
        method = 'GET';
    this.callURL(url, method, callback);
  };

  /**
   * Search a tldr by url
   * GET /tldrs/search?url=:url
   * @param {String} url
   * @param {Function} callback Will be called after request is processed. Signature: err, tldr
   *                            err is a message explaining the error, or null if no error
   *                            tldr is the tldr
   *
   */
  Client.prototype.searchByUrl = function (url, callback) {
    var url = this.apiUrl + '/tldrs/search?url=' + encodeURIComponent(url),
        method = 'GET';
    this.callURL(url, method, callback);
  };


  /**
   * Search tldrs by batch
   * POST /tldrs/searchBatch
   * @param {Array} urls Array of urls whose tldr we want
   * @param {Function} callback Will be called after request is processed. Signature: err, tldrs
   *                            err is a message explaining the error, or null if no error
   *                            tldrs is an array of the tldrs, in the same order
   *
   */
  Client.prototype.searchBatch = function (urls, callback) {
    var url = this.apiUrl + '/tldrs/searchBatch',
        method = 'POST',
        options = { data:{ batch: urls } };
    this.callURL(url, method, options, callback);
  };

  // Expose the client constructor in the global object
  if (window) {
    window.TldrioApiClient = Client;
  } else {
    console.log("This is not a browser.  Please use the node wrapped version.");
  }
