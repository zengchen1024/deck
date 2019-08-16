'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.search.resultFormatter', [])
  .factory('huaweicloudSearchResultFormatter', [
    '$q',
    function($q) {
      return {
        securityGroups: function(entry) {
          return $q.when((entry.name || entry.securityGroup) + ' (' + entry.region + ')');
        },
      };
    },
  ]);
