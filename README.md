# Simple API Management Node.js middleware

![Simple API Management Logo](https://storage.googleapis.com/simple-api-management-assets/logo.svg) 
![Simple API Management Logo](https://storage.googleapis.com/simple-api-management-assets/headline.png) 



## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```bash
$ npm install simpleapimanagement
```

## Usage

```js
const simpleAPIManagement = require('simpleapimanagement');

var options = {
  apiKey: 'add your API key here',
  rateLimits: false, // default
  metrics: true, // default
  // [OPTIONAL] 
  exclude: ['authorization'] 
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


| Option | Use |
| :--- | :--- |
| apiKey | **required: true** Get your API key from our app https://app.simpleapimanagement.com. Your API key will be displayed after signign up and creating an API.|
| rateLimits | **default: false** If true, configured rate limits will be checked. For more information please see: https://simpleapimanagement.com/ratelimits|
| metrics | **default: true** By default, we send metics to our service. Metrics consists of various informations like the path, method, statusCode, request, response. This information is used to aggregate your APIs metrics. For more information please see: https://simpleapimanagement.com/metrics  |
| exclude | **optional** An array of keys from your API requests and responses headers as well as bodies that you wish to exclude from sending to Simple API Management. We recommend to exclude any sensitive information.|


