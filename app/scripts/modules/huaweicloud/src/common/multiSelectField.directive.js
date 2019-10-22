'use strict';

import _ from 'lodash';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.huaweicloud.common.multiSelectField.directive', [])
  .directive('hwcMultiSelectField', function() {
    return {
      restrict: 'E',
      templateUrl: require('./multiSelectField.directive.template.html'),
      scope: {
        cache: '<',
        refreshCache: '=',
        label: '@',
        resetting: '<',
        model: '=',
        onChange: '&',
        required: '<?',
      },
      link: function(scope) {
        _.defaults(scope, {
          initValue: scope.model,
          state: { selectedOptions: scope.model },
          refreshTooltipLabel: scope.label,
          refreshTooltipTemplate: require('./cacheRefresh.tooltip.html'),
          cache: [],
          required: false,
          forceRefreshCache: _.isFunction(scope.refreshCache) ? scope.refreshCache : function() {},

          /* see below on watch state.selectedOptions
          onSelectionsChanged: function() {
            // Hack to work around bug in ui-select where selected values re-appear in the drop-down
            scope.state.selectedOptions = _.uniq(scope.state.selectedOptions);
            if (scope.onChange) {
              var args = { selection: scope.state.selectedOptions };
              scope.onChange(args);
            }
          },
          */
        });

        // the on-select event of ui-select may doesn't work when it works on multiple model.
        // so, it needs to watch the selected options to get the new selected result.
        scope.$watch('state.selectedOptions', function() {
          scope.model = scope.state.selectedOptions;

          if (scope.onChange) {
            var args = { selection: scope.state.selectedOptions };
            scope.onChange(args);
          }
        });

        scope.$watch('resetting', function() {
          scope.state.selectedOptions = [];
        });

        function includedAllInitValue() {
          if (_.isEmpty(scope.initValue)) {
            return false;
          }

          var values = _.intersection(_.map(scope.options, 'id'), scope.initValue);
          if (_.isEmpty(values)) {
            return false;
          }

          var diff = _.difference(values, scope.initValue);
          return _.isEmpty(diff);
        }

        function updateOptions() {
          scope.options = _.sortBy(scope.cache, 'name');
          if (includedAllInitValue()) {
            scope.state.selectedOptions = scope.initValue;
          }
        }

        scope.$watch('cache', updateOptions);

        updateOptions();
      },
    };
  });
