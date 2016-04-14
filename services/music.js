/*jslint node: true */
'use strict';

(function(module) {
  const fetch = require('node-fetch')
  const Promise = require('bluebird')
  const genresJSON = require('../data/genres')
  const Spotify = require('spotify-web-api-node')
  const config = require('../config')

  module.getRecommendation = getRecommendation

  function getRecommendation(selectedGenre, limit) {
    const spotify = new Spotify({
      clientId : config.api.spotify.clientId,
      clientSecret : config.api.spotify.clientSecret
    })

    return Promise.resolve()
      .then(getSpotifyAccessToken)
      .then(getRecommendation)

    function getSpotifyAccessToken() {
      return spotify.clientCredentialsGrant()
        .then((data) => {
          spotify.setAccessToken(data.body['access_token']);
        })
    }

    function getRecommendation() {
      return spotify.getRecommendations({
        seed_genres: selectedGenre,
        limit: limit
      })
      .then((resp) => {
        return _parseForTrackList(resp.body.tracks, limit)
      })
    }
  }

  function _parseForTrackList(songs, limit) {
    songs = songs.slice(0, limit)

    return songs.map((song) => {
      return song.external_urls.spotify
    })
  }
}(exports));
