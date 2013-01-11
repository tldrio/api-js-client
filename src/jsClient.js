require(
[ 'jquery'
, 'domReady'
],
function
( $
, domReady
) {
  // Code of the main module begins here
  var apiUrl = 'http://localhost:8787';

  function getLatestTldrs(number, callback) {
    $.ajax({ type: 'GET'
           , url: apiUrl + '/tldrs/latest/' + number
           , headers: { 'API-client-name': 'untest'
                      , 'API-client-key': 'graou'
                      }
           , crossDomain: true
           })
     .done(function (data) {
       console.log(data);
     });
  }

  getLatestTldrs(3);

});

