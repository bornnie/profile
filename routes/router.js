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

router.post('/register', function(req,res){
const email  = req.body.email;
				User.findOne({email:email}).then(function(user){
				if(user){
								req.flash('error','User already exists!');
								res.redirect('/users/login');
				}	
				var firstname = req.body.firstname;
				var lastname = req.body.lastname;
				var email = req.body.email;
				var password  = req.body.password;
				
				let user = new User({
								firstname:firstname,
								lastname:lastname,
								email:email,
								password:password
				});
				
				user.save().then(function(user){
								req.flash('info','You have successfully registered');
								res.redirect('/users');
				}).catch(err=>console.log(err));
				}).catch(err=>console.log(err)l);
});

module.exports = router;
