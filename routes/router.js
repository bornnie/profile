const router = require("express").Router();
const User = require("../models/profiler");
const flash = require('connect-flash');

router.use(function (req,res,next) {
				res.locals.currentUser = req.user;
				res.locals.errors = req.flash('error');
				res.locals.infos = req.flash('info');
				next();
});

router.get('/', function(){
				res.send('It is working fine');
});

module.exports = router;
