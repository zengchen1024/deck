'use strict';

const angular = require('angular');

import { ModalWizard } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.serverGroup.configure.huaweicloud.basicSettings', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../serverGroup/serverGroupConfigSelectField.directive').name,
  ])
  .controller('huaweicloudServerGroupBasicSettingsCtrl', [
    '$scope',
    '$controller',
    '$uibModalStack',
    '$state',
    function($scope, $controller, $uibModalStack, $state) {
      angular.extend(
        this,
        $controller('BasicSettingsMixin', {
          $scope: $scope,
          $uibModalStack: $uibModalStack,
          $state: $state,
        }),
      );

      $scope.configFilter = {
        account: $scope.command.credentials,
        region: $scope.command.region,
      };

      $scope.$watch('command.credentials', function(account) {
        $scope.configFilter.account = account;
      });

      $scope.onRegionSelectedChanged = function(region) {
        $scope.configFilter.region = region;
      };

      $scope.$watch('basicSettings.$valid', function(newVal) {
        if (newVal) {
          ModalWizard.markClean('basic');
          ModalWizard.markComplete('basic');
        } else {
          ModalWizard.markIncomplete('basic');
        }
      });
    },
  ]);
