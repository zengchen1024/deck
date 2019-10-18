'use strict';

const angular = require('angular');
import _ from 'lodash';

module.exports = angular
  .module('spinnaker.huaweicloud.loadBalancer.selector.directive', [require('../common/selectField.component').name])
  .directive('hwcLoadBalancerSelector', [
    '$q',
    function($q) {
      return {
        restrict: 'E',
        templateUrl: require('../common/selectField.template.html'),
        scope: {
          label: '@',
          labelColumnSize: '@',
          helpKey: '@',
          model: '=',
          availableLBs: '<',
          onChange: '&',
          readOnly: '=',
          allowNoSelection: '=',
          noOptionsMessage: '@',
          noSelectionMessage: '@',
        },
        link: function(scope) {
          _.defaults(scope, {
            label: 'Load Balancer',
            labelColumnSize: 3,
            valueColumnSize: 7,
            options: [],
            updateOptions: function() {
              scope.options = _.map(scope.availableLBs, function(item) {
                return { label: item.name, value: item.id };
              });
              return $q.when(scope.options);
            },

            onValueChanged: function(newValue) {
              scope.model = newValue;
              if (scope.onChange) {
                scope.onChange({ loadbalancer: newValue });
              }
            },
          });

          scope.$watch(
            'availableLBs',
            function() {
              scope.$broadcast('updateOptions');
            },
            true,
          );
        },
      };
    },
  ]);
