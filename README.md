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
The syntax is `client.getLatestTldrs(number, callback)`, where `number` is the number of tldrs you want to get (maximum 10) and the callback's signature is (error, tldrs). `error` will for example tell you if you have a credentials issue. For example:

```javascript
client.getLatestTldrs(5, function (err, tldrs) {
  if (err) {
    return console.log("Dang, an error happened: " + err);
  } else {
    console.log("Here are five awesome summaries", tldrs);
  }
});
```

## Searching tldrs by url
The syntax is `client.searchByUrl(url, callback)` where `url` is the url (figures ...) and `callback` has signature (error, tldr). For example:

```javascript
client.searchByUrl('http://tldr.io', function (err, tldr) {
  // tldr will hold the tldr of our home page
  // which you can also read at http://tldr.io/tldrs/50252d16959a1fee13000052/tl-dr-sooo-meta-isnt-it
});
```
