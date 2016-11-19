//Function that creates constant
(function() {
    'use strict';
    //Creates the phone detail controller angular module
    angular
        .module('app')
        //Makes it a constant
        .constant('REQUEST', {
            //Then connects to the phones json file
            'Phones' : './data/phones.json'
        }); 
})();