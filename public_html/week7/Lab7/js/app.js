//Function that creates Angular module
(function() {
    'use strict';
    //Creates angule app
    angular
        .module('app',['ngRoute'])
        .config(config); 

    config.$inject = ['$routeProvider']; 
    
    //Function to Check URL
    function config($routeProvider){
        $routeProvider.
            //Loads phone list template
            when('/', {
                templateUrl: 'js/phone-list.template.html',
                controller: 'PhoneListController',
                controllerAs: 'vm'
            }).
            //Loads phone detail template
            when('/phones/:phoneId', {
                templateUrl: 'js/phone-detail.template.html',
                controller: 'PhoneDetailController',
                controllerAs: 'vm'
            }).
            //Else redirect to '/'
            otherwise({
                redirectTo: '/'
            });
    }
})();