'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.huaweicloud.serverGroup.configure', [
  require('./serverGroupCommandBuilder.service').name,
  require('./serverGroupConfiguration.service').name,
  require('./wizard/basic/basicSettings.controller').name,
  require('./wizard/location/locationSettings.controller').name,
  require('./wizard/network/networkSettings.controller').name,
  require('./wizard/loadbalancer/loadbalancerSettings.controller').name,
  require('./wizard/instance/instanceSettings.controller').name,
  require('./wizard/healthcheck/healthCheckSettings.controller').name,
  require('./wizard/clone.controller').name,
]);
