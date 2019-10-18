'use strict';

const angular = require('angular');
import _ from 'lodash';

// import { API } from '@spinnaker/core';

module.exports = angular
  .module('spinnaker.huaweicloud.serverGroup.serverGroupConfig.selector.directive', [
    require('../common/selectField.component').name,
  ])
  .directive('hwcServerGroupConfigSelector', [
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
          filter: '=',
          onChange: '&',
          readOnly: '=',
          allowNoSelection: '=',
          noOptionsMessage: '@',
          noSelectionMessage: '@',
        },
        link: function(scope) {
          _.defaults(scope, {
            label: 'Config',
            labelColumnSize: 3,
            valueColumnSize: 7,
            options: [{ label: scope.model, value: scope.model }],
            filter: {},
            allConfigs: [],

            updateOptions: function() {
              scope.options = _.chain(scope.allConfigs)
                .filter(scope.filter || {})
                .map(function(s) {
                  return { label: s.name, value: s.id };
                })
                .sortBy(function(o) {
                  return o.label;
                })
                .value();

              return $q.when(scope.options);
            },

            onValueChanged: function(newValue) {
              scope.model = newValue;
              if (scope.onChange) {
                scope.onChange({ config: newValue });
              }
            },
          });

          scope.$watch(
            'filter',
            function() {
              scope.$broadcast('updateOptions');
            },
            true,
          );

          function getAllConfigs() {
            scope.allConfigs = [
              {
                account: 'chenzeng',
                id: '52786fff-1a83-4cfa-ad91-b150627074c1',
                name: 'as-config-chenzeng-ubuntu',
                region: 'cn-north-1',
              },
            ];
            /*	  
          return API.all('serverGroupConfigs/find', 'huaweicloud')
            .getList()
            .then(function(results) {
              return results;
            })
            .catch(function() {
              return [];
            });*/
          }

          getAllConfigs();
          scope.updateOptions();
        },
      };
    },
  ]);
