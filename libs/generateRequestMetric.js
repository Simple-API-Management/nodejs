const omitProperties = require('lodash/omit');
const objectToArray = require('./objectToArray');

module.exports = (req, options = {}) => {
    if (options.exclude) {
        req.body = omitProperties(req.body, options.exclude);
        req.headers = omitProperties(req.headers, options.exclude)
    }

    return {
        headers: objectToArray(req.headers),
        body: req.body,
        host: req.headers['x-forwarded-host'] || req.get('host'),
        path: req.baseUrl + req.path,
        query: objectToArray(req.query),
        procotol: req.headers['x-forwarded-proto'] || req.protocol,
        method: req.method,
        httpVersion: `${req.protocol.toUpperCase()}/${req.httpVersion}`
    };
};
