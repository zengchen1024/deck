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
        onChange: '&',
        required: '<?',
      },
      link: function(scope) {
        _.defaults(scope, {
          state: { selectedOptions: [] },
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
          if (scope.onChange) {
            var args = { selection: scope.state.selectedOptions };
            scope.onChange(args);
          }
        });

        scope.$watch('resetting', function() {
          scope.state.selectedOptions = [];
        });

        function updateOptions() {
          scope.options = _.sortBy(scope.cache, 'name');
        }

        scope.$watch('cache', updateOptions);

        updateOptions();
      },
    };
  });
