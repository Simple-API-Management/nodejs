const omitProperties = require('lodash/omit');
const objectToArray = require('./objectToArray');

module.exports = (res, options = {}) => {
    let body;
    try {
        body = JSON.parse(res._body);

        if (options.exclude) {
            body = omitProperties(body, options.exclude);
        }
    } catch (e) {
        body = res._body;
    }

    let headers = res.getHeaders();

    if (options.exclude) {
        headers = omitProperties(headers, options.exclude);
    }

    return {
        statusCode: res.statusCode ? res.statusCode : 000,
        statusMessage: res.statusMessage,
        headers: objectToArray(headers),
        body: JSON.parse(body),
        bodySize: res.get('content-length') || 0,
        bodyMimeType: res.get('content-type'),
    };
};
