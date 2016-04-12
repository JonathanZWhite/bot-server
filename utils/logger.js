const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'node.log' })
    ]
});

module.exports = logger;
