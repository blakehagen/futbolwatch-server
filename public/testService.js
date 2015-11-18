angular.module('serverApp').service('testService', function($http, $q){
    
    this.getData = function(){
        var deferred = $q.defer();
        $http({
            method: "GET",
            url: "/test"
        }).then(function(response){
            deferred.resolve(response)
        })
        return deferred.promise
    };
    
    
    
    
    
    
});

