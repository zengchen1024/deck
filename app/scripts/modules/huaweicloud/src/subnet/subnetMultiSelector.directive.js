'use strict';

const angular = require('angular');
import _ from 'lodash';

import { SubnetReader } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.subnet.multiSelector.directive', [
    require('../common/multiSelectField.directive').name,
  ])
  .directive('hwcSubnetMultiSelector', function() {
    return {
      restrict: 'E',
      templateUrl: require('../common/multiSelectField.template.html'),
      scope: {
        label: '@',
        //helpKey: '@',
        model: '=',
        filter: '<',
        onChange: '&',
        required: '<',
      },
      link: function(scope) {
        _.defaults(scope, {
          label: 'Subnets',
          required: false,
          resetting: false,
          filter: {},
          cache: [],
          allSubnets: [],
          refreshCache: function() {
            scope.cache = _.chain(scope.allSubnets)
              .filter(scope.filter || {})
              .map(function(s) {
                return { name: s.name, id: s.id };
              })
              .sortBy(function(o) {
                return o.name;
              })
              .value();
          },

          onSelectedValueChanged: function(selection) {
            scope.model = selection;
            if (scope.onChange) {
              scope.onChange({ subnets: selection });
            }
          },
        });

        // reset current selection if changing the data source
        scope.$watch(
          'filter',
          function() {
            scope.resetting = !scope.resetting;
            scope.refreshCache();
          },
          true,
        );

        SubnetReader.listSubnetsByProvider('huaweicloud').then(function(subnets) {
          scope.allSubnets = subnets;
          scope.refreshCache();
        });
      },
    };
  });
