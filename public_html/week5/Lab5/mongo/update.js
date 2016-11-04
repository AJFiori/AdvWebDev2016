/* 
 * These examples do not work as is, they are just code examples on how to do so.
 */

var Review = require('../models/review');


var id = req.params.id;
if (req.method === 'POST') {

    id = req.body._id;
    var query = { '_id': req.body._id };
    
    var update = {
     data1: req.body.data1,
     data2: req.body.data2,
     data3: req.body.data3,
     data4: req.body.data4,
     data5: req.body.data5,
     data6: req.body.data6,
     data7: req.body.data7
   };
   
   var options = {};
   var callback = function(){};
   
   Review.update(query, update, options, callback);

}