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

  Client.prototype.getLatestTldrs = function (number, callback) {
    $.ajax({ type: 'GET'
           , url: this.apiUrl + '/tldrs/latest/' + number
           , headers: { 'api-client-name': this.name
                      , 'api-client-key': this.key
                      }
           , crossDomain: true
           })
     .done(function (data) {
       console.log(data);
     });
  };

  // Expose the client constructor in the global object
  window.TldrioApiClient = Client;
