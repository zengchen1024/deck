'use strict';

describe('Controller: huaweicloudSecurityGroupDetailsController', function() {
  //load the controller module
  beforeEach(window.module(require('./details.controller').name));

  // Initialize the controller and a mock scope
  beforeEach(
    window.inject(function($controller, $rootScope, $q) {
      this.editSecurityGroup = {
        name: 'example-TestSecurityGroup1',
        region: 'TestRegion1',
        accountId: 'example',
        id: '0000-0000-0000-0000',
        vpcId: '0000-0000-0000-0000',
        provider: 'huaweicloud',
      };

      this.$scope = $rootScope.$new();

      function addDeferredMock(obj, method) {
        obj[method] = jasmine.createSpy().and.callFake(function() {
          var d = $q.defer();
          obj[method].deferred = d;
          return d.promise;
        });
        return obj;
      }

      this.mockState = {
        go: jasmine.createSpy(),
      };
      this.mockModal = {
        confirm: jasmine.createSpy(),
        open: jasmine.createSpy(),
      };
      this.mockApplication = {
        isStandalone: true,
      };

      this.mockSecurityGroupReader = addDeferredMock({}, 'getSecurityGroupDetails');
      this.mockSecurityGroupWriter = addDeferredMock({}, 'deleteSecurityGroup');

      this.createController = function(resolvedSecurityGroup) {
        this.ctrl = $controller('huaweicloudSecurityGroupDetailsController', {
          $scope: this.$scope,
          $uibModal: this.mockModal,
          $state: this.mockState,
          app: this.mockApplication,
          resolvedSecurityGroup: resolvedSecurityGroup,

          securityGroupReader: this.mockSecurityGroupReader,

          confirmationModalService: this.mockState,
        });
      };
    }),
  );

  describe('initialized for create', function() {
    beforeEach(function() {
      this.createController(this.editSecurityGroup);
    });

    it('has the expected methods and properties', function() {
      expect(this.ctrl.editSecurityGroup).toBeDefined();
      expect(this.ctrl.deleteSecurityGroup).toBeDefined();
    });

    it('initializes the scope', function() {
      expect(this.$scope.state).toEqual({
        loading: true,
        standalone: true,
      });
    });

    it('firewall for edit', function() {
      expect(this.mockSecurityGroupReader.getSecurityGroupDetails).toHaveBeenCalledWith(
        this.mockApplication,
        this.editSecurityGroup.accountId,
        this.editSecurityGroup.provider,
        this.editSecurityGroup.region,
        this.editSecurityGroup.vpcId,
        this.editSecurityGroup.name,
      );
    });

    describe('firewall object should get set.', function() {
      beforeEach(function() {
        var securityGroup = this.editSecurityGroup;
        var details = {
          plain: function() {
            return securityGroup;
          },
        };
        this.mockSecurityGroupReader.getSecurityGroupDetails.deferred.resolve(details);
        this.$scope.$digest();
      });

      it('should set firewall region', function() {
        expect(this.$scope.state.loading).toEqual(false);
      });
    });
  });
});
