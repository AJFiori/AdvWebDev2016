/* 
 * These examples do not work as is, they are just code examples on how to do so.
 */

var Product = require('../models/product');

/* this params needs to be from the request object in express */
 var id = req.params.id;

 Product
    .findOne({ '_id': id })
    .exec(function(err, results){
        /* a way to send the results to the view if found */
         if ( results ) {
            res.render('update', { 
                message: 'Updated Product',
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });