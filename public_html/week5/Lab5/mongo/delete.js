/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Employee = require('../models/employee');

var id = req.params.id;

Employee.remove({ _id: id }, function(err) {
            if (!err) {
                /* Document Deleted */
            }
            else {
                /* Document NOT Deleted */
            }
});