const _ = require('lodash-node');
const logger = require('../utils/logger');
const Promise = require('bluebird')

const Music = require('../handlers/music')
const music = new Music()

/**
 * ## Handler
 *
 * Decorator for API functions which are called via an webhook. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 */
function handle(apiMethod) {
  return apiMethod().then((response) => {
    // converts response to array
    response = response instanceof Array ? response : [response]

    return Promise.resolve(response)
  })
  .catch(() => {
    logger.log('error', 'ERROR: ' + err);
  })
}

module.exports = {
  handle: handle,
  music: music
};
