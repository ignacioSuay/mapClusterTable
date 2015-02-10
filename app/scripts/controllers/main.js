'use strict';

/**
 * @ngdoc function
 * @name malariaVisualApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the malariaVisualApp
 */
angular.module('malariaVisualApp')
  .controller('MainCtrl', function ($scope,uiGmapGoogleMapApi) {

    uiGmapGoogleMapApi.then(function(maps) {

      $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 3};


      $scope.clusterOptions = {
        //gridSize: 60,
        //ignoreHidden: true,
        //minimumClusterSize: 5
      };

      $scope.sampleData = [
        ['Longitude', 'Latitude', 'Sample Size'],
        [10.21175671, -0.705904007, 5],
        [39.85445404, -3.615070343, 200],
        [-17.45047951, 14.69526958, 30],
        [-15.45047951, 14.69526958, 70]
      ];

      var tableData = $scope.sampleData.slice();


      $scope.container1 = document.getElementById('example1');

      $scope.tableSettings = {
        data: tableData,
        colHeaders: true,
        colWidths: [200, 200, 200],
        rowHeaders: true,
        manualColumnResize: true,
        manualRowResize: true,
        contextMenu: true,
        minSpareRows:1,
        minRows: 5
      };

      $scope.load = function () {
        var data = $scope.hot1.getData();
        $scope.createMarkers(data);
      };

      $scope.clear = function () {
        $scope.hot1.loadData([['Longitude', 'Latitude', 'Sample Size']]);
      };

      $scope.loadSampleData = function () {
        $scope.hot1.loadData($scope.sampleData.slice());
      };


      $scope.hot1 = new Handsontable($scope.container1, $scope.tableSettings);
      $scope.hot1.render();

      $scope.createMarkers = function(data){
        var markers = [];
        for (var i = 1; i < data.length; i++) {
          var sampleSize = data[i][2];
          if(sampleSize > 0) {
            for (var j = 0; j < sampleSize; j++) {
              var newMarker = {
                id: parseInt(Math.round(Math.random()*1000000000)),
                latitude: parseFloat(data[i][1]),
                longitude: parseFloat(data[i][0]),
                showWindow: false,
                title: 'Marker' + i + j
              };
              markers.push(newMarker);
            }
          }
        }
        $scope.markers = markers;
      };

      $scope.load();
    });
  });
