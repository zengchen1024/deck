'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.loadBalancer.configure.huaweicloud', [
  require('./wizard/upsert.controller').name,
]);
