'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.loadBalancer.details.huaweicloud', [
  require('./loadBalancerDetails.controller').name,
]);
