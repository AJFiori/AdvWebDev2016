/* 
 * These examples do not work as is, they are just code examples on how to do so.
 */

var Product = require('../models/product');


 Product
    .find()
    .exec(function(err, results){
    
            /* a way to send the results to the view */
            res.render('view', {               
                allResults : results,
            });
    });