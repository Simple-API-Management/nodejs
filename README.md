![Simple API Management Logo](https://storage.googleapis.com/simple-api-management-assets/logo.svg) 
# Simple API Management Node.js middleware



## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```bash
$ npm install simple-api-management-nodejs
```

## Usage

```js
const simpleAPIManagement = require('simple-api-management-nodejs');

var options = {
  apiKey: 'add your API key here',
  rateLimits: true, // default
  metrics: true, // default
  // [OPTIONAL] 
  // identifier can be used to apply rate limits for specific attributes like ip or user
  identifier: function (req, res) { 
    if (req.user) {
      return req.user.id;
    }
    return undefined;
  },
};

app.use(simpleAPIManagement(options));
```
