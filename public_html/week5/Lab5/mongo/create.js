/* 
 * These examples do not work as is, they are just code examples on how to do so.
 */

var Employee  = require('../models/employee ');


  Employee.create({
    data1: 'data1',
    data2: 'data2',
    data3: 'data3',
    data4: 'data4',
    data5: 'data5',
    data6: 'data6',
    data7: 'data7'
  },function (err) {           
     /* saved! Callbacks are optional */
     successCB();
  });