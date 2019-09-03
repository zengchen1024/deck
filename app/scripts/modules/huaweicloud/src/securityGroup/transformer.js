'use strict';

const angular = require('angular');

import { HuaweiCloudProviderSettings } from '../huaweicloud.settings';

module.exports = angular
  .module('spinnaker.huaweicloud.securityGroup.transformer', [])
  .factory('huaweicloudSecurityGroupTransformer', [
    '$q',
    function($q) {
      function normalizeSecurityGroup(securityGroup) {
        return $q.when(securityGroup);
      }

      function constructNewSecurityGroupTemplate() {
        return {
          provider: 'huaweicloud',
          region: '',
          stack: '',
          description: '',
          detail: '',
          account: HuaweiCloudProviderSettings.defaults.account,
          rules: [],
        };
      }

      function constructNewIngressRule() {
        return {
          fromPort: 1,
          toPort: 65535,
          prevcidr: '',
          cidr: '',
          protocol: 'TCP',
          remoteSecurityGroupId: '',
          icmpType: -1,
          icmpCode: -1,
        };
      }

      function prepareForSaving(securityGroup) {
        _.forEach(securityGroup.rules, function(value) {
          if (value['remoteSecurityGroupId'] === 'CIDR') {
            value['remoteSecurityGroupId'] = '';
          }
        });

        return securityGroup;
      }

      function prepareForEdit(securityGroup) {
        securityGroup.rules =
          _.map(securityGroup.inboundRules, function(sgRule) {
            if (!sgRule.protocol) {
              return null;
            }
            return {
              fromPort: sgRule.protocol.toUpperCase() !== 'ICMP' ? sgRule.portRanges[0].startPort : '',
              toPort: sgRule.protocol.toUpperCase() !== 'ICMP' ? sgRule.portRanges[0].endPort : '',

              icmpType: sgRule.protocol.toUpperCase() === 'ICMP' ? sgRule.portRanges[0].startPort : '',
              icmpCode: sgRule.protocol.toUpperCase() === 'ICMP' ? sgRule.portRanges[0].endPort : '',

              cidr: sgRule.range ? sgRule.range.ip + sgRule.range.cidr : '',
              protocol: sgRule.protocol.toUpperCase(),
              prevcidr: sgRule.range ? sgRule.range.ip + sgRule.range.cidr : '',
              remoteSecurityGroupId: sgRule.securityGroup ? sgRule.securityGroup.id : 'CIDR',
            };
          }).filter(function(e) {
            return e !== null;
          }) || [];
        securityGroup.account = securityGroup.accountName;
        securityGroup.accountName = undefined;
        return securityGroup;
      }

      return {
        normalizeSecurityGroup: normalizeSecurityGroup,
        constructNewSecurityGroupTemplate: constructNewSecurityGroupTemplate,
        constructNewIngressRule: constructNewIngressRule,
        prepareForEdit: prepareForEdit,
        prepareForSaving: prepareForSaving,
      };
    },
  ]);
