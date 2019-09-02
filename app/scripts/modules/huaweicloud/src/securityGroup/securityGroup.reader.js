'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.securityGroup.reader', [])
  .factory('huaweicloudSecurityGroupReader', function() {
    function resolveIndexedSecurityGroup(indexedSecurityGroups, container, securityGroupId) {
      if (/^\[u'/.test(securityGroupId)) {
        securityGroupId = securityGroupId.split("'")[1];
      }

      return indexedSecurityGroups[container.account][container.region][securityGroupId];
    }

    return {
      resolveIndexedSecurityGroup: resolveIndexedSecurityGroup,
    };
  });
