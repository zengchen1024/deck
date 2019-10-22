'use strict';

const angular = require('angular');
import _ from 'lodash';

import { SubnetReader } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.az.multiSelector.directive', [require('../common/multiSelectField.directive').name])
  .directive('hwcAzMultiSelector', function() {
    return {
      restrict: 'E',
      templateUrl: require('../common/multiSelectField.template.html'),
      scope: {
        label: '@',
        //helpKey: '@',
        model: '=',
        onChange: '&',
        required: '<',
        zoneOptions: '<',
      },
      link: function(scope) {
        _.defaults(scope, {
          label: 'Zones',
          required: false,
          resetting: false,
          cache: [],
          refreshCache: function() {
            scope.cache = _.chain(scope.zoneOptions)
              .map(function(item) {
                return { name: item, id: item };
              })
              .sortBy(function(o) {
                return o.name;
              })
              .value();
          },

          onSelectedValueChanged: function(selection) {
            if (scope.onChange) {
              scope.onChange({ az: selection });
            }
          },
        });

        // reset current selection if changing the data source
        scope.$watch(
          'zoneOptions',
          function() {
            scope.resetting = !scope.resetting;
            scope.refreshCache();
          },
          true,
        );
      },
    };
  });
