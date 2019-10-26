'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.loadbalancerSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../loadBalancer/loadBalancerSelector.directive').name,
  ])
  .controller('hwcServerGroupLoadBalancerSettingsCtrl', [
    '$scope',
    function($scope) {
      $scope.lbState = {
        isBindLoadBalancer: $scope.command.hasOwnProperty('loadBalancers') && !_.isEmpty($scope.command.loadBalancers),
      };

      if (!$scope.lbState.isBindLoadBalancer) {
        $scope.command.loadBalancers = {};
        $scope.command.loadBalancers.weight = 1;
      }

      function updateLoadBalancers() {
        var filter = {
          account: $scope.command.credentials,
          region: $scope.command.region,
        };
        $scope.application.loadBalancers.refresh();
        $scope.allLoadBalancers = _.filter($scope.application.loadBalancers.data, filter);
      }

      $scope.$watch('command.credentials', updateLoadBalancers);
      $scope.$watch('command.region', updateLoadBalancers);
      $scope.$watch('application.loadBalancers', updateLoadBalancers);

      updateLoadBalancers();

      $scope.onLoadBalancerSelectedChanged = function(loadbalancer) {
        var lb = _.find($scope.allLoadBalancers, function(item) {
          return item.id === (loadbalancer || $scope.allLoadBalancers[0].id);
        });

        $scope.loadBalancerPools = lb.pools;
      };
    },
  ]);
