var express = require('express');
var router = express.Router();
var ctrlEmployees = require('../controllers/employees');

// reviews
router.get('/employees', ctrlEmployees.employeesReadAll);
router.get('/employees/:employeeid', ctrlEmployees.employeesReadOne);
router.post('/employees', ctrlEmployees.employeeCreate);
router.put('/employees/:employeeid', ctrlEmployees.employeesUpDateOne);
router.delete('/employees/:employeeid', ctrlEmployees.employeesDeleteOne);

module.exports = router;
