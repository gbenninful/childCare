describe('Unit: HomeController', function () {

    var controller;

    beforeEach(angular.mock.module('ChildCare'));
    beforeEach(inject(function (_$rootScope_, $controller) {
        controller = $controller('HomeController', {
            $scope: _$rootScope_.$new()
        });
    }));

    it('should have a name', function () {
        expect(controller.name).toEqual('Hello there');
    });

});