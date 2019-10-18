'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.wizard.instanceSettings.controller', [
    require('@uirouter/angularjs').default,
    require('angular-ui-bootstrap'),
    require('../../../../common/selectField.component').name,
  ])
  .controller('hwcServerGroupInstanceSettingsCtrl', [
    '$scope',
    function($scope) {
      $scope.instanceRemovalPolicies = [
        { label: 'Oldest instance created from oldest configuration', value: 'OLD_CONFIG_OLD_INSTANCE' },
        { label: 'Newest instance created from oldest configuration', value: 'OLD_CONFIG_NEW_INSTANCE' },
        { label: 'Oldest instance', value: 'OLD_INSTANCE' },
        { label: 'Newest instance', value: 'NEW_INSTANCE' },
      ];

      $scope.onInstanceRemovalPolicySelectedChanged = function(policy) {
        $scope.command.instanceRemovePolicy = policy;
      };
    },
  ]);
