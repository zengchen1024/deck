'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.locationSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../availableZone/azMultiSelector.directive').name,
  ])
  .controller('hwcServerGroupLocationSettingsCtrl', [
    '$scope',
    function($scope) {
      var azPolicyOptions = ['EQUILIBRIUM_DISTRIBUTE', 'PICK_FIRST'];
      if (
        !$scope.command.hasOwnProperty('multiAZPriorityPolicy') ||
        azPolicyOptions.indexOf($scope.command.multiAZPriorityPolicy) == -1
      ) {
        $scope.command.multiAZPriorityPolicy = 'EQUILIBRIUM_DISTRIBUTE';
      }

      $scope.allAvailabilityZones = [];

      // TODO now, it needs to watch the result of getAvailabilityZones,
      // otherwise it has to refresh manually to get available zones
      $scope.$watch(
        function() {
          return getAvailabilityZones().join(',');
        },
        function() {
          $scope.allAvailabilityZones = getAvailabilityZones();
        },
      );

      function getAvailabilityZones() {
        var account = $scope.command.credentials;
        var region = $scope.command.region;
        if (!account || !region) {
          return [];
        }
        return _.get(
          $scope.command,
          ['backingData', 'credentialsKeyedByAccount', account, 'regionToZones', region],
          [],
        );
      }
    },
  ]);
