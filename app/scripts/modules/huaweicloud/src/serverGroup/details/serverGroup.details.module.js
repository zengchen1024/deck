'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.huaweicloud.serverGroup.details', [
  require('./serverGroupDetails.huaweicloud.controller').name,
  require('./resize/resizeServerGroup.controller').name,
]);
