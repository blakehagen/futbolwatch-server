angular.module('serverApp').controller('homeCtrl', function($scope, testService){
    
    $scope.test = "hello world";
    
    $scope.data = function(){
        testService.getData().then(function(response){
            console.log(response);
            $scope.status = response.status;
            $scope.message = response.data;
        })
    };
    

    
    
    
    
    
});