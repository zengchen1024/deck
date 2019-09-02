'use strict';

const angular = require('angular');

module.exports = angular.module('spinnaker.securityGroup.configure.huaweicloud', [
  require('./wizard/rules.controller').name,
  require('./wizard/upsert.controller').name,
]);
