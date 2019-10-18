'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.locationSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../common/multiSelectField.directive').name,
  ])
  .controller('hwcServerGroupLocationSettingsCtrl', [
    '$scope',
    function($scope) {
      $scope.resetting = false;

      $scope.allAvailabilityZones = [];

      $scope.updateAvailabilityZones = function() {
        $scope.allAvailabilityZones = getAvailabilityZones();
      };

      $scope.onAZSelectedChanged = function(selection) {
        $scope.command.zones = selection;
      };

      $scope.$watch('command.credentials', reset);
      $scope.$watch('command.region', reset);

      // TODO now, it needs to watch the result of getAvailabilityZones,
      // otherwise it has to refresh manually to get available zones
      $scope.$watch(
        function() {
          return _.map(getAvailabilityZones(), 'id').join(',');
        },
        function() {
          $scope.updateAvailabilityZones();
        },
      );

      function reset() {
        $scope.resetting = !$scope.resetting;
        $scope.updateAvailabilityZones();
      }

      function getAvailabilityZones() {
        var account = $scope.command.credentials;
        var region = $scope.command.region;
        if (!account || !region) {
          return [];
        }
        var ids = _.get(
          $scope.command,
          ['backingData', 'credentialsKeyedByAccount', account, 'regionToZones', region],
          [],
        );
        return ids.map(i => {
          return { id: i, name: i };
        });
      }
    },
  ]);
