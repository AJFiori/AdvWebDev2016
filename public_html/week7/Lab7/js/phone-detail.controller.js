//Function that creates the phone list controller
(function() {
    'use strict';
    //Creates phone detail controller angular module
    angular
        .module('app')
        .controller('PhoneDetailController', PhoneDetailController); //Makes the controller

//Creates modular strings
    PhoneDetailController.$inject = ['$routeParams', 'PhonesService']; 
    
// PhoneDetailController controller function  
    function PhoneDetailController($routeParams, PhonesService){
        var vm = this;
        //phone variable for controller
        vm.phone = {};
        //grabs phoneId
        var id = $routeParams.phoneId;
        
        
        activate();
        //Private acivate function
        function activate() {
            //grabs phone by id and sets it as a varible
            PhonesService.findPhone(id).then(function(response){
                vm.phone = response;
            });
        }
    }
})();