'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.huaweicloud.serverGroup.details', [
  require('./serverGroupDetails.controller').name,
  require('./resize/resizeServerGroup.controller').name,
  require('./rollback/rollbackServerGroup.controller').name,
]);
