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
    this.apiUrl = 'https://api.tldr.io/v1';
  }


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
    $.ajax({ type: 'GET'
           , url: this.apiUrl + '/tldrs/latest/' + number
           , headers: { 'api-client-name': this.name
                      , 'api-client-key': this.key
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
   * Search a tldr by url
   * GET /tldrs/search?url=:url
   * @param {String} url
   * @param {Function} callback Will be called after request is processed. Signature: err, tldr
   *                            err is a message explaining the error, or null if no error
   *                            tldr is the tldr
   *
   */
  Client.prototype.searchByUrl = function (url, callback) {
    $.ajax({ type: 'GET'
           , url: this.apiUrl + '/tldrs/search?url=' + encodeURIComponent(url)
           , headers: { 'api-client-name': this.name
                      , 'api-client-key': this.key
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
   * Search tldrs by batch
   * POST /tldrs/searchBatch
   * @param {Array} urls Array of urls whose tldr we want
   * @param {Function} callback Will be called after request is processed. Signature: err, tldrs
   *                            err is a message explaining the error, or null if no error
   *                            tldrs is an array of the tldrs, in the same order
   *
   */
  Client.prototype.searchBatch = function (urls, callback) {
    $.ajax({ type: 'POST'
           , url: this.apiUrl + '/tldrs/searchBatch'
           , data: { batch: urls }
           , headers: { 'api-client-name': this.name
                      , 'api-client-key': this.key
                      }
           })
     .done(function (data) { callback(null, data.tldrs); })
     .fail(function (jqxhr) {
       if (jqxhr.status === 404) { return callback('URL not found'); }
       if (jqxhr.status === 401) { return callback(jqxhr.responseText); }

       return callback('An unknown error happened');
     });
  };


  // Expose the client constructor in the global object
  window.TldrioApiClient = Client;
