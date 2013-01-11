# Javascript client for tldr.io's public API

Browser-side Javascript client for <a href="tldr.io">tldr.io</a>'s
public API.

## Installation
Just include `jsClient.js` in the webpage. You can alternatively copy
its content (it's very small) in your script.

You also need jQuery, and then you're set!


## Creating a client
```javascript
var client = new TldrioApiClient({ name: 'YOUR_CLIENT_NAME'
                                 , key: 'YOUR_CLIENT_KEY'
                                 });

```

## Getting the latest tldrs
The syntax is `client.getLatestTldrs(number, callback)`, where `number` is the number of tldrs you want to get (maximum 10) and the callback's signature is (error, tldrs). Example:

```javascript
client.getLatestTldrs(5, function (err, tldrs) {
  if (err) { return console.log("Dang, an error happened: " + err); }
    
  console.log(tldrs);    
})
```

