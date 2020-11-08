
const generateRequestMetric = require('./generateRequestMetric');
const generateResponseMetric = require('./generateResponseMetric');
const { name, version } = require('../package.json');

module.exports = (req, res, options = {}) => ({
    key: options.apiKey,
    packageName: name,
    packageVersion: version,
    processPlatform: process.platform,
    processVersion: process.version,
    latency: new Date() - req._startTime,
    request: generateRequestMetric(req, options),
    response: generateResponseMetric(res, options),
});
