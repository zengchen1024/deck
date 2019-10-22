'use strict';

import _ from 'lodash';

const angular = require('angular');

//import { ApplicationReader, NameUtils, SubnetReader } from '@spinnaker/core';
import { ApplicationReader, NameUtils } from '@spinnaker/core';

import { HuaweiCloudProviderSettings } from '../../huaweicloud.settings';

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.configure.commandBuilder.service', [
    require('../../image/image.reader').name,
  ])
  .factory('hwcServerGroupCommandBuilder', [
    '$q',
    /*
    'huaweicloudImageReader',
    'loadBalancerReader',
    function($q, huaweicloudImageReader, loadBalancerReader) {
    */
    function($q) {
      function buildNewServerGroupCommand(application, defaults) {
        defaults = defaults || {};

        var defaultCredentials =
          defaults.account ||
          application.defaultCredentials.huaweicloud ||
          HuaweiCloudProviderSettings.defaults.account;

        var defaultRegion =
          defaults.region || application.defaultRegions.huaweicloud || HuaweiCloudProviderSettings.defaults.region;

        return $q.when({
          selectedProvider: 'huaweicloud',
          application: application.name,
          credentials: defaultCredentials,
          region: defaultRegion,
          // associatePublicIpAddress: false,
          strategy: '',
          stack: '',
          freeFormDetails: '',
          minSize: 1,
          desiredSize: 1,
          maxSize: 1,
          loadBalancers: {},
          securityGroups: [],
          tags: {},
          viewState: {
            mode: defaults.mode || 'create',
            disableStrategySelection: true,
            loadBalancersConfigured: false,
            securityGroupsConfigured: false,
          },
        });
      }

      // Only used to prepare view requiring template selecting
      function buildNewServerGroupCommandForPipeline(stage, pipeline) {
        return ApplicationReader.getApplication(pipeline.application).then(function(application) {
          return buildNewServerGroupCommand(application).then(function(command) {
            command.viewState.requiresTemplateSelection = true;
            command.viewState.disableStrategySelection = false;
            return command;
          });
        });
      }

      function buildServerGroupCommandFromExisting(application, serverGroup, mode = 'clone') {
        var serverGroupName = NameUtils.parseServerGroupName(serverGroup.name);

        var command = {
          selectedProvider: 'huaweicloud',

          application: application.name,
          credentials: serverGroup.account,
          region: serverGroup.region,
          stack: serverGroupName.stack,
          freeFormDetails: serverGroupName.freeFormDetails,

          zones: serverGroup.zones,
          multiAZPriorityPolicy: serverGroup.multiAZPriorityPolicy,

          minSize: parseInt(serverGroup.capacity.min),
          maxSize: parseInt(serverGroup.capacity.max),
          desiredSize: parseInt(serverGroup.capacity.desired),

          vpcId: serverGroup.vpcId,
          subnets: serverGroup.subnets,

          loadBalancers: serverGroup.loadBalancerDetails ? serverGroup.loadBalancerDetails[0] : {},

          instanceRemovePolicy: serverGroup.instanceRemovePolicy,
          deleteEIP: serverGroup.deleteEIP,

          healthCheckWay: serverGroup.healthCheckWay,
          healthCheckInterval: serverGroup.healthCheckInterval,
          healthCheckGracePeriod: serverGroup.healthCheckGracePeriod,

          tags: serverGroup.tags,

          source: {
            account: serverGroup.account,
            region: serverGroup.region,
            asgName: serverGroup.name,
            serverGroupName: serverGroup.name,
            serverGroupId: serverGroup.groupId,
          },
          viewState: {
            mode: mode,
            isNew: false,
            dirty: {},
          },
        };

        if (serverGroup.launchConfig) {
          command.serverGroupConfigId = serverGroup.launchConfig.serverGroupConfigId;
        }

        if (mode === 'editPipeline') {
          command.strategy = 'redblack';
          command.suspendedProcesses = [];
        }

        return command;
      }

      function buildServerGroupCommandFromPipeline(application, originalCluster) {
        var command = _.cloneDeep(originalCluster);
        if (!command.credentials) {
          command.credentials = command.account;
        }
        var params = command.serverGroupParameters;
        delete command.serverGroupParameters;
        return _.extend(command, params, {
          selectedProvider: 'huaweicloud',
          viewState: {
            disableImageSelection: true,
            mode: 'editPipeline',
            dirty: {},
          },
        });
      }

      return {
        buildNewServerGroupCommand: buildNewServerGroupCommand,
        buildServerGroupCommandFromExisting: buildServerGroupCommandFromExisting,
        buildNewServerGroupCommandForPipeline: buildNewServerGroupCommandForPipeline,
        buildServerGroupCommandFromPipeline: buildServerGroupCommandFromPipeline,
      };
    },
  ]);
