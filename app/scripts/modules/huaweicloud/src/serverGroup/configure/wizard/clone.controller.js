'use strict';

const angular = require('angular');

import { FirewallLabels, SERVER_GROUP_WRITER, TaskMonitor, ModalWizard } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.clone.controller', [
    require('@uirouter/angularjs').default,
    SERVER_GROUP_WRITER,
    require('../serverGroupConfiguration.service').name,
  ])
  .controller('hwcServerGroupCloneCtrl', [
    '$scope',
    '$uibModalInstance',
    '$q',
    '$state',
    'serverGroupWriter',
    'hwcServerGroupConfigurationService',
    'serverGroupCommand',
    'application',
    'title',
    function(
      $scope,
      $uibModalInstance,
      $q,
      $state,
      serverGroupWriter,
      hwcServerGroupConfigurationService,
      serverGroupCommand,
      application,
      title,
    ) {
      $scope.pages = {
        basicSettings: require('./basic/basicSettings.html'),
        locationSettings: require('./location/locationSettings.html'),
        templateSelection: require('./templateSelection.html'),
        clusterSettings: require('./cluster/clusterSettings.html'),
        instanceSettings: require('./instance/instanceSettings.html'),
        networkSettings: require('./network/networkSettings.html'),
        loadbalancerSettings: require('./loadbalancer/loadbalancerSettings.html'),
        healthCheckSettings: require('./healthcheck/healthCheckSettings.html'),
        otherSettings: require('./other/otherSettings.html'),
      };

      $scope.title = title;

      $scope.applicationName = application.name;
      $scope.application = application;

      $scope.command = serverGroupCommand;
      $scope.contextImages = serverGroupCommand.viewState.contextImages;

      $scope.state = {
        loaded: false,
        requiresTemplateSelection: !!serverGroupCommand.viewState.requiresTemplateSelection,
      };

      this.templateSelectionText = {
        copied: [
          'account, namespace, cluster name (stack, details)',
          'load balancers',
          FirewallLabels.get('firewalls'),
          'container configuration',
        ],
        notCopied: [],
      };

      if (!$scope.command.viewState.disableStrategySelection) {
        this.templateSelectionText.notCopied.push(
          'the deployment strategy (if any) used to deploy the most recent server group',
        );
      }

      $scope.taskMonitor = new TaskMonitor({
        application: application,
        title: 'Creating your server group',
        modalInstance: $uibModalInstance,
      });

      function configureCommand() {
        serverGroupCommand.viewState.contextImages = $scope.contextImages;
        $scope.contextImages = null;
        hwcServerGroupConfigurationService.configureCommand(application, serverGroupCommand).then(function() {
          $scope.state.loaded = true;
          initializeWizardState();
          initializeWatches();
        });
      }

      function initializeWatches() {
        $scope.$watch('command.account', $scope.command.accountChanged);
        $scope.$watch('command.namespace', $scope.command.namespaceChanged);
      }

      function initializeWizardState() {
        var mode = serverGroupCommand.viewState.mode;
        if (mode === 'clone' || mode === 'editPipeline') {
          ModalWizard.markComplete('location');
        }
      }

      this.isValid = function() {
        return $scope.command && $scope.command.account !== null && ModalWizard.isComplete();
      };

      this.showSubmitButton = function() {
        return ModalWizard.allPagesVisited();
      };

      this.submit = function() {
        if ($scope.command.viewState.mode === 'editPipeline' || $scope.command.viewState.mode === 'createPipeline') {
          return $uibModalInstance.close($scope.command);
        }
        $scope.taskMonitor.submit(function() {
          return serverGroupWriter.cloneServerGroup(angular.copy($scope.command), application);
        });
      };

      this.cancel = function() {
        $uibModalInstance.dismiss();
      };

      if (!$scope.state.requiresTemplateSelection) {
        configureCommand();
      } else {
        $scope.state.loaded = true;
      }

      this.templateSelected = () => {
        $scope.state.requiresTemplateSelection = false;
        configureCommand();
      };
    },
  ]);
