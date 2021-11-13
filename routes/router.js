const router = require("express").Router();
const User = require("../models/profile");
const flash = require('connect-flash');

router.use(function (req,res,next) {
				res.locals.currentUser = req.user;
				res.locals.errors = req.flash('error');
				res.locals.infos = req.flash('info');
				next();
});

router.get('/', function(){
			User.find({}).then(function (users) {
					if(users)	{
									res.render("home",{
													title:"Home Page",
													users:users
									});
					}	
			}).catch(err=>console.log(err.msg));
});

module.exports = router;
