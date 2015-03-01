var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', function($scope, $mdSidenav) {
  $scope.flags = [
    {
      "name": "This is my flag",
      "img": "http://puu.sh/ghOyD/63c94e57ea.png"
    },
    {
      "name": "Test",
      "img": "http://puu.sh/ghOzs/aa810bd6e4.png"
    }
  ];
});
