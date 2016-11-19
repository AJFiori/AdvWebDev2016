//Function that creates phone list controller
(function() {
    'use strict';
    //Creates phone detail controller angular module
    angular
        .module('app')
        .factory('PhonesService', PhonesService); //Creates the service

//Creates modular strings
    PhonesService.$inject = ['$http', 'REQUEST'];
    
    function PhonesService($http, REQUEST){
        //grabs the url
        var url = REQUEST.Phones;
        //grabs the service
        var service = {
            'getPhones' : getPhones,
            'findPhone' : findPhone
        };
        return service;
        
        //grabs the phones
        function getPhones(){
            //callback results return
            return $http.get(url)
                    .then(getPhoneSuccess, getPhoneFailed);
            
            //private getPhoneSuccess callback function
            function getPhoneSuccess(response){
                return response.data;
            }
            
            //private getPhoneFailed callback function
            function getPhoneFailed(error){
                return [];
            }
        }
        
        function findPhone(id){
            //returns the getPhoneSuccess function
            return getPhones()
                    .then(function(data){
                       return findPhoneSuccess(data); 
                    });
            function findPhoneSuccess(data){
                
                var results = {};
                
                //completes functions for phones
                angular.forEach(data, function(value, key){
                    if(!results.length){
                        if(value.hasOwnProperty('id') && value.id === id){
                            results = angular.copy(value);
                        }
                    }
                }, results);
                //return phone results
                return results;
            }
        }
    }
})();