'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.huaweicloud.loadBalancer.configure', [
  require('./wizard/upsert.controller').name,
]);
