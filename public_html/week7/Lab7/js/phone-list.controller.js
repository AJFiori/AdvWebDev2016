//Function that creates phone list controller
(function() {
    'use strict';
    //Creates phone list controller angular module
    angular
        .module('app')
        .controller('PhoneListController', PhoneListController); //Makes the contorller

//Creates modular strings
    PhoneListController.$inject = ['PhonesService']; 
    
 // PhoneListController controller function     
    function PhoneListController(PhonesService){
        var vm = this;
        //clears phones array
        vm.phones = [];
        
        activate();
        //Private acivate function
        function activate() {
            //grabs phone list and sets it as a varible
            PhonesService.getPhones().then(function(response){
                vm.phones = response;
            });
        }
    }
})();