'use strict';

const angular = require('angular');

import { API } from '@spinnaker/core';

module.exports = angular.module('spinnaker.huaweicloud.image.reader', []).factory('huaweicloudImageReader', function() {
  function findImages(params) {
    return API.all('images/find')
      .getList(params)
      .then(function(results) {
        return results;
      })
      .catch(function() {
        return [{ id: 'abcd' }];
      });
  }

  function getImage(amiName, region, credentials) {
    return API.all('images')
      .one(credentials)
      .one(region)
      .all(amiName)
      .getList({ provider: 'huaweicloud' })
      .then(function(results) {
        return results && results.length ? results[0] : null;
      })
      .catch(function() {
        return [];
      });
  }

  return {
    findImages: findImages,
    getImage: getImage,
  };
});
