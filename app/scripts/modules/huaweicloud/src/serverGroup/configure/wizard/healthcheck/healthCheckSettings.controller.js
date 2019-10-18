'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.healthCheckSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../common/selectField.component').name,
  ])
  .controller('hwcServerGroupHealthCheckSettingsCtrl', [
    '$scope',
    function($scope) {
      $scope.checkWayOptions = [{ label: 'ECS health check', value: 'NOVA_AUDIT' }];
      $scope.checkWayOptions.push({ label: 'ELB health check', value: 'ELB_AUDIT' });

      $scope.onCheckWaySelectedChanged = function(way) {
        $scope.command.healthCheckWay = way;
      };

      $scope.checkIntervalOptions = [
        { label: '5 minutes', value: '5' },
        { label: '15 minutes', value: '15' },
        { label: '1 hour', value: '60' },
        { label: '3 hours', value: '180' },
      ];

      $scope.onCheckIntervalSelectedChanged = function(interval) {
        $scope.command.healthCheckInterval = Number(interval);
      };
    },
  ]);
