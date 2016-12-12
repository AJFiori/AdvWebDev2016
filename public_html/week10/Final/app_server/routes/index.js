var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');

/* Locations pages */
router.all('/', ctrlHome.home);
router.all('/index', ctrlHome.home);
router.all('/view/:id?', ctrlHome.view);

module.exports = router;
