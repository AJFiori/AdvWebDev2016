var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.employeesReadAll = function(req, res) {
        
    console.log('Getting all employees');
    Employee
     .find()
     .exec(function(err, results){
          if ( err ) {
              sendJSONresponse(res, 404, err);
          } else {
              sendJSONresponse(res, 200, results);
          }
     });
};



module.exports.employeesReadOne = function(req, res) {
    
    if (req.params && req.params.employeeid) {
      console.log('Getting single employee with id =', req.params.employeeid );
      Employee
      .findById(req.params.employeeid)
      .exec(function(err, results){

          if ( results ) {
             sendJSONresponse(res, 200, results);
          } else {
              sendJSONresponse(res, 404, {
                "message": "employeeid not found"
              });
          }

      });

    } else {
        sendJSONresponse(res, 404, {
            "message": "employeeid not found"
        });
    }
};




/*   POST a new employee
 *   /api/v1/employees 
 */
module.exports.employeeCreate = function(req, res) {
    
    console.log('Creating a employee with data ', req.body);
    
    Employee.create({
          fName: req.body.fName,
          lName: req.body.lName,
          department: req.body.department,
          date: req.body.date,
          job: req.body.job,
          salary: req.body.salary
  
    }, function(err, dataSaved) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(dataSaved);
          sendJSONresponse(res, 201, dataSaved);
        }
    });
  
  
};



module.exports.employeesUpdateOne = function(req, res) {
    
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employeeid is required"
    });
    return;
  }
  Employee
    .findById(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (!employeeData) {
          sendJSONresponse(res, 404, {
            "message": "employeeid not found"
          });
          return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        employeeData.fName = req.body.fName;
        employeeData.lName = req.body.lName;
        employeeData.department = req.body.department,
        employeeData.date = req.body.date,
        employeeData.job = req.body.job,
        employeeData.salary = req.body.salary;
        

        employeeData.save(function(err, data) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, data);
          }
        });
    });
    
};

module.exports.employeesDeleteOne = function(req, res) {
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employeeid is required"
    });
    return;
  }
  Employee
    .findByIdAndRemove(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
          console.log("Employee id " + req.params.employeeid + " deleted");
          sendJSONresponse(res, 204, null);
                
    });
};
