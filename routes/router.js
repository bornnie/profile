const router = require("express").Router();
const User = require("../models/profile");
const flash = require('connect-flash');

router.use(function (req,res,next) {
				//res.locals.currentUser = req.user;
				res.locals.errors = req.flash('error');
				res.locals.infos = req.flash('info');
				next();
});

router.get('/', function(req,res){
			User.find({}).then(function (users) {
					if(users)	{
					console.log(users);
									res.render("home",{
													title:"Home Page",
													users:users
									});
					}	
			}).catch(err=>console.log(err));
});

router.get('/register', function(req,res){
				res.render('signup',{
								title:'Registration form'
				});
});

router.post('/register',function(req,res){
				User.findOne({email:req.body.email}).then(function(user){
				if(user){
								req.flash('error','User is already registered');
								res.redirect('/users/login');
				}else{
								const profile = new User({
												firstname : req.body.firstname,
												lastname : req.body.lastname,
												email : req.body.email,
												password : req.body.password
								});
						profile.save(function(err,user){
									if(err){
													console.log(err);
									}	else {
													req.flash('info','You have been successfully registered');
													res.redirect('/users');
									}
						});
				}			
				}).catch(function(err){
								console.log(err);
				});
});

router.get('/login', function(req,res){
				res.render('login',{
								title:'Login form'
				});
});

module.exports = router;
