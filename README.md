# Javascript client for tldr.io's public API

Browser-side Javascript client for <a href="http://tldr.io">tldr.io</a>'s
public API (whose doc you can find <a href="http://tldr.io/api-documentation">here</a>). For now only three routes are implemented: getting the latest tldrs and searching by url.

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

## Searching the tldrs for a batch of urls
The syntax is `client.searchBatch(urls, callback)` where `urls` is an array of urls and `callback` has signature (error, tldrs). You can't search for more than 50 tldrs at once. For example:

```javascript
client.searchBatch(['http://tldr.io', 'http://news.ycombinator.com/'], function (err, tldrs) {
  // tldrs will hold the two tldrs correspondign to the following pages:
  // http://tldr.io/tldrs/50252d16959a1fee13000052/tl-dr-sooo-meta-isnt-it
  // http://tldr.io/tldrs/50633f3cfc4cf9870800000a/hacker-news
});
```

## License 

(The MIT License)

Copyright (c) 2012 tldr.io &lt;hello@tldr.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
