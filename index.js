const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://api.simpleapimanagement.com'
});

function SimpleAPIManagement(options) {

    if (options.rateLimits === undefined) {
        options.rateLimits = true;
    }

    if (options.metrics === undefined) {
        options.metrics = true;
    }


    async function simpleAPIManagementMiddleware(req, res, next) {
        try {
            req._startTime = Date.now();

            if (options.rateLimits) {
                let response = await instance.post('/ratelimits/validate', {
                    path: req.path,
                    key: options.apiKey,
                    identifier: options.identifier,
                    method: req.method
                })

                if (response.data.limitReached) {
                    res.status(429).send('Rate limit exceeded')
                }
                else {
                    // track metrics and go to next middleware
                    next()
                }
            } else{
                // track metrics and go to next middleware
                next()
            }


            res.on('finish', function () {
                if (options.metrics) {
                    let responseTime = new Date() - req._startTime;
                    let host = req.headers.host || req.hostname;
                    let statusCode = res.statusCode ? res.statusCode : 000;

                    let path = req.route ? req.baseUrl + req.route.path : req.baseUrl
  
                    instance.post('/metrics', {
                        key: options.apiKey,
                        host: host,
                        request: req.originalUrl,
                        path: path,
                        method: req.method,
                        statusCode: statusCode,
                        latency: responseTime
                    })
                }
            })


        }
        catch (err) {
            if (err.response) {
                console.error(err.response.data);
            } else if (err.request) {
                console.error('Service not available');
            }

            // call next without err to prevent side effects on customers API
            next();
        }

    }

    return simpleAPIManagementMiddleware;
}

module.exports = SimpleAPIManagement;