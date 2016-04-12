const _ = require('lodash-node');
const logger = require('../utils/logger');
const Promise = require('bluebird')

const Weather = require('../handlers/weatherHandler')
const weather = new Weather()

/**
 * ## Handler
 *
 * Decorator for API functions which are called via an webhook. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 */
function handle(apiMethod) {
  console.log('HANDLING')

  return apiMethod().then((response) => {
    return Promise.resolve(response)
  })
  .catch(() => {
    logger.log('error', 'ERR: ' + err);
  })
}

module.exports = {
  handle: handle,
  weather: weather
};
