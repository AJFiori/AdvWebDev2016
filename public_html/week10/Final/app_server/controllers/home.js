/* GET 'home info' page */


var Product = require('../models/product');

module.exports.home = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'Fiori Final',
            message : 'New Product Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Product.create({
          product: req.body.product,
          description: req.body.description,
          price: req.body.price
        },function (err) {           
           // saved!
           successCB();
        });
              
    } else {
         res.render('index', { 
            title: 'Fiori Final',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id,
         removed = '';
 
    function finish() {     
       Product
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View New Products',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Product.remove({ _id: id }, function (err) {
                   if (!err) {
                        resolve('Product has been removed'); // success
                    } else {
                        reject('Product has not been removed'); // failure
                    }
               });                
                
            });
         
         
             removePromise.then(function(result) {
                 removed = id + result;
                 finish(); 
             }, function(result) {
                 removed = id + result;
                 finish();  
             });
           
                
     } else {
      finish();
    }
     
     
    
};



