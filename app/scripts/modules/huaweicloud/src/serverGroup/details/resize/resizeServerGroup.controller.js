'use strict';

const angular = require('angular');

import { SERVER_GROUP_WRITER, TaskMonitor } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.details.resize.controller', [SERVER_GROUP_WRITER])
  .controller('huaweicloudResizeServerGroupCtrl', [
    '$scope',
    '$uibModalInstance',
    'serverGroupWriter',
    'application',
    'serverGroup',
    function($scope, $uibModalInstance, serverGroupWriter, application, serverGroup) {
      $scope.serverGroup = serverGroup;
      $scope.currentSize = {
        min: serverGroup.capacity.min,
        max: serverGroup.capacity.max,
        desired: serverGroup.capacity.desired,
      };

      $scope.verification = {};

      $scope.command = {
        capacity: angular.copy($scope.currentSize),
        advancedMode: serverGroup.capacity.min !== serverGroup.capacity.max,
      };

      if (application && application.attributes) {
        if (application.attributes.platformHealthOnlyShowOverride && application.attributes.platformHealthOnly) {
          $scope.command.interestingHealthProviderNames = ['HuaweiCloud'];
        }

        $scope.command.platformHealthOnlyShowOverride = application.attributes.platformHealthOnlyShowOverride;
      }

      this.isValid = function() {
        var command = $scope.command;
        if (!$scope.verification.verified) {
          return false;
        }
        return command.advancedMode
          ? command.capacity.min <= command.capacity.max &&
              command.capacity.desired >= command.capacity.min &&
              command.capacity.desired <= command.capacity.max
          : command.capacity.desired !== null;
      };

      $scope.taskMonitor = new TaskMonitor({
        application: application,
        title: 'Resizing ' + serverGroup.name,
        modalInstance: $uibModalInstance,
        onTaskComplete: () => application.serverGroups.refresh(),
      });

      this.resize = function() {
        if (!this.isValid()) {
          return;
        }

        if (!$scope.command.advancedMode) {
          $scope.command.capacity.min = $scope.command.capacity.desired;
          $scope.command.capacity.max = $scope.command.capacity.desired;
        }

        var submitMethod = function() {
          return serverGroupWriter.resizeServerGroup(serverGroup, application, {
            capacity: $scope.command.capacity,
            serverGroupName: serverGroup.name,
            serverGroupId: serverGroup.groupId,
            targetSize: $scope.command.capacity.desired,
            region: serverGroup.region,
            interestingHealthProviderNames: $scope.command.interestingHealthProviderNames,
          });
        };

        $scope.taskMonitor.submit(submitMethod);
      };

      this.cancel = function() {
        $uibModalInstance.dismiss();
      };
    },
  ]);
