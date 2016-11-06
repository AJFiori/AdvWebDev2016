/* 
 * These examples do not work as is, they are just code examples on how to do so.
 */

var Employee = require('../models/employee');

/* this params needs to be from the request object in express */
 var id = req.params.id;

 Employee
    .findOne({ '_id': id })
    .exec(function(err, results){
        /* a way to send the results to the view if found */
         if ( results ) {
            res.render('update', { 
                message: 'Updated Employee',
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });