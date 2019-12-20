var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');


router.post('/signup', function(req, res, next) {
	userDao.add(req, res, next);
});

router.post('/signin', function(req, res, next) {
	userDao.login(req, res, next);
});


module.exports = router;
