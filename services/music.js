/*jslint node: true */
'use strict';

(function(module) {
  const fetch = require('node-fetch')

  module.get = get

  function get() {
    return fetch('https://api.spotify.com/v1/search?q=%22%22genre:%22r&b%22&type=track')
      .then((resp) => {
        return resp.json()
      })
      .then((json) => {
        let responses = []

        responses.push('Why not give this a listen 💃')
        responses.push(_parseForTrack(json.tracks.items))

        return responses
      })
  }

  function _parseForTrack(songs) {
    // generates gets random song from results
    const songIndex = Math.floor((Math.random() * songs.length - 1));

    return songs[songIndex].external_urls.spotify
  }
}(exports));
