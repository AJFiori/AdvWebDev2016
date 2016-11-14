var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/home');

/* Locations pages */
router.get('/', ctrlLocations.homePage);
router.get('/form', ctrlLocations.getFormPage);
router.post('/form', ctrlLocations.formPagePost);


module.exports = router;
