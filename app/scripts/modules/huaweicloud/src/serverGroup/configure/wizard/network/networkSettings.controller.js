'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.networkSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../subnet/subnetMultiSelector.directive').name,
  ])
  .controller('hwcServerGroupNetworkSettingsCtrl', [
    '$scope',
    function($scope) {
      $scope.vpcFilter = {
        account: $scope.command.credentials,
        region: $scope.command.region,
      };

      $scope.subnetFilter = {
        account: $scope.command.credentials,
        region: $scope.command.region,
        vpcId: $scope.command.vpcId,
      };

      $scope.onNetworkSelectedChanged = function(network) {
        $scope.subnetFilter.vpcId = network;
      };

      $scope.$watch('command.credentials', function(account) {
        $scope.subnetFilter.account = account;
        $scope.subnetFilter.region = $scope.command.region;

        $scope.vpcFilter.account = account;
        $scope.vpcFilter.region = $scope.command.region;
      });

      $scope.$watch('command.region', function(region) {
        $scope.subnetFilter.account = $scope.command.credentials;
        $scope.subnetFilter.region = region;

        $scope.vpcFilter.account = $scope.command.credentials;
        $scope.vpcFilter.region = region;
      });
    },
  ]);
