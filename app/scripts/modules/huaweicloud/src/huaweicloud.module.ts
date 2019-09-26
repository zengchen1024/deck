'use strict';

import { module } from 'angular';

import { CloudProviderRegistry, DeploymentStrategyRegistry } from '@spinnaker/core';
import './help/huaweicloud.help';

import './logo/huaweicloud.logo.less';

// load all templates into the $templateCache
const templates = require.context('./', true, /\.html$/);
templates.keys().forEach(function(key) {
  templates(key);
});

export const HUAWEICLOUD_MODULE = 'spinnaker.huaweicloud';
module(HUAWEICLOUD_MODULE, [
  require('./common/selectField.component').name,
  require('./search/resultFormatter').name,
  require('./subnet/subnet.renderer').name,
  require('./serverGroup/serverGroup.transformer').name,
  require('./serverGroup/configure/ServerGroupCommandBuilder').name,
  require('./serverGroup/configure/serverGroup.configure.huaweicloud.module').name,
  require('./serverGroup/configure/wizard/Clone.controller').name,
  require('./serverGroup/details/serverGroup.details.module').name,
  require('./instance/huaweicloudInstanceType.service').name,
  require('./instance/details/instance.details.controller').name,
  require('./securityGroup/securityGroup.reader').name,
  require('./securityGroup/configure/configure.huaweicloud.module').name,
  require('./securityGroup/details/details.controller').name,
  require('./securityGroup/transformer').name,
  require('./loadBalancer/configure/configure.huaweicloud.module').name,
  require('./loadBalancer/details/details.huaweicloud.module').name,
  require('./loadBalancer/transformer').name,
  require('./pipeline/stages/bake/huaweicloudBakeStage').name,
  require('./pipeline/stages/findAmi/huaweicloudFindAmiStage').name,
  require('./pipeline/stages/cloneServerGroup/huaweicloudCloneServerGroupStage').name,
]).config(() => {
  CloudProviderRegistry.registerProvider('huaweicloud', {
    name: 'huaweicloud',
    logo: {
      path: require('./logo/huaweicloud.logo.png'),
    },
    search: {
      resultFormatter: 'huaweicloudSearchResultFormatter',
    },
    subnet: {
      renderer: 'huaweicloudSubnetRenderer',
    },
    image: {
      reader: 'huaweicloudImageReader',
    },
    instance: {
      instanceTypeService: 'huaweicloudInstanceTypeService',
      detailsTemplateUrl: require('./instance/details/instanceDetails.html'),
      detailsController: 'huaweicloudInstanceDetailsCtrl',
    },
    serverGroup: {
      transformer: 'huaweicloudServerGroupTransformer',
      commandBuilder: 'huaweicloudServerGroupCommandBuilder',
      configurationService: 'huaweicloudServerGroupConfigurationService',
      cloneServerGroupController: 'huaweicloudCloneServerGroupCtrl',
      cloneServerGroupTemplateUrl: require('./serverGroup/configure/wizard/serverGroupWizard.html'),
      detailsController: 'huaweicloudServerGroupDetailsCtrl',
      detailsTemplateUrl: require('./serverGroup/details/serverGroupDetails.html'),
    },
    securityGroup: {
      reader: 'huaweicloudSecurityGroupReader',
      transformer: 'huaweicloudSecurityGroupTransformer',
      detailsTemplateUrl: require('./securityGroup/details/details.html'),
      detailsController: 'huaweicloudSecurityGroupDetailsController',
      createSecurityGroupTemplateUrl: require('./securityGroup/configure/wizard/createWizard.html'),
      createSecurityGroupController: 'huaweicloudUpsertSecurityGroupController',
    },
    loadBalancer: {
      transformer: 'huaweicloudLoadBalancerTransformer',
      detailsTemplateUrl: require('./loadBalancer/details/details.html'),
      detailsController: 'huaweicloudLoadBalancerDetailsController',
      createLoadBalancerTemplateUrl: require('./loadBalancer/configure/wizard/createWizard.html'),
      createLoadBalancerController: 'huaweicloudUpsertLoadBalancerController',
    },
  });
});

DeploymentStrategyRegistry.registerProvider('huaweicloud', ['redblack']);
