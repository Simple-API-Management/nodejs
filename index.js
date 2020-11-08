const axios = require('axios').default;
const generateMetric = require('./libs/generateMetric');

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
            // log request start time
            req._startTime = Date.now();
            
            // log response body
            res._body = '';
            const { write, end } = res;

            res.write = (chunk, encoding, cb) => {
                res._body += chunk;
                write.call(res, chunk, encoding, cb);
            };

            res.end = (chunk, encoding, cb) => {
                if (chunk) {
                    res._body += chunk;
                }

                end.call(res, chunk, encoding, cb);
            };
            
            // apply rate limit checks if enabled
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
            } else {
                // track metrics and go to next middleware
                next()
            }


            // send metrics on finish
            res.on('finish', function () {
                console.log(res._body)
                if (options.metrics) {
                    let metric = generateMetric(req, res, options)
                    instance.post('/metrics', metric)
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