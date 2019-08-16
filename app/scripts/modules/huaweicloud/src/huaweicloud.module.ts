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
  });
});

DeploymentStrategyRegistry.registerProvider('huaweicloud', ['redblack']);
