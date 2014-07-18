angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = [
       {
           "id": 32,
           "code": "2352646",
           "name": "Albany",
           "enlishName": "Albany",
           "countryName": "United States",
           "countryCode": "1",
           "timeZone": "EST5EDT",
           "latitude": "42.6525",
           "longitude": "-73.757222"
       },
       {
           "id": 20,
           "code": "2354877",
           "name": "Annapolis",
           "enlishName": "Annapolis",
           "countryName": "United States",
           "countryCode": "1",
           "timeZone": "EST5EDT",
           "latitude": "38.972944",
           "longitude": "-76.501158"
       },
       {
           "id": 10,
           "code": "2357024",
           "name": "Atlanta",
           "enlishName": "Atlanta",
           "countryName": "United States",
           "countryCode": "1",
           "timeZone": "EST5EDT",
           "latitude": "33.755",
           "longitude": "-84.39"
       },
       {
           "id": 19,
           "code": "2357379",
           "name": "Augusta",
           "enlishName": "Augusta",
           "countryName": "United States",
           "countryCode": "1",
           "timeZone": "EST5EDT",
           "latitude": "44.310556",
           "longitude": "-69.78"
       }];
    $scope.delete=function(index) {
    $scope.items.splice(index,1);
  };

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};