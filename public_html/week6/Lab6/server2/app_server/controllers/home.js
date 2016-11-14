
var request = require('request');

//Gets Employee info
module.exports.homePage = function(req, res) {
        
    var requestOptions = {
          url : 'http://localhost:3001/api/v1/employees',
          method : "GET",
          json : {},
          qs : {}
        };
        
  request( requestOptions, function(err, response, body) {
      var results = [];
      if (response.statusCode === 200 && body.length) {
        results = (body instanceof Array) ? body : [];        
      }
      
      res.render('index', {
            title: 'Home Page',
            results: results
        });
    }
            
  );  
  
};

//Post new employee information
module.exports.formPagePost = function(req, res){
    
    var formPost = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        }
              
    var requestOptions = {
          url : 'http://localhost:3001/api/v1/employees',
          method : "POST",
          json : formPost,
          qs : {}
        };
        
  request( requestOptions, function(err, response, body) {
      var results = [];
      if (response.statusCode === 200 && body.length) {
        results = (body instanceof Array) ? body : [];        
      }
      res.redirect("/");
        }
    );
};

module.exports.getFormPage = function(req, res){
    res.render('form', {
        title: 'Add New Employee'
    });
};



