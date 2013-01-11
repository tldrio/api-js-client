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
    this.apiUrl = options.apiUrl || 'https://api.tldr.io/v1';
  }


  /**
   * Fetch the latest tldrs
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
           , crossDomain: true
           })
     .done(function (data) { callback(null, data); })
     .fail(function (jqxhr) {
       if (jqxhr.status === 404) { return callback('URL not found'); }
       if (jqxhr.status === 401) { return callback(jqxhr.responseText); }

       return callback('An unknown error happened');
     });
  };



  // Expose the client constructor in the global object
  window.TldrioApiClient = Client;
