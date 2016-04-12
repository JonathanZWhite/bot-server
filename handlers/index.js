const _ = require('lodash-node');
const logger = require('../utils/logger');

/**
 * ## Handler
 *
 * Decorator for API functions which are called via an webhook. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 */
function handler(apiMethod) {
  return function(req, res, next) {

    return apiMethod().then(function(response) {
      // Send a properly formatted HTTP response containing the data with correct headers
      return 'HELLO WORLD'

    })
    .catch(next)
    .error(function(err) {
      logger.log('error', 'ERR: ' + err);
      return next(err);
    });
  };
}

module.exports = {
  handler: handler
};
