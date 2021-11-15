const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const saltFactor =10;

const userSchema = mongoose.Schema({
				createdAt:{
								type:Date,
								default:Date.now()
				},
				firstname:{
								type:String,
								required:[true,'firstname field is required']
				},
				lastname:{
								type:String,
								required:[true,'lastname field is required']
				},
				email:{
								type:String,
								required:[true,'email field is required']
						},
					password:{
												type: String,
												required:[true,'password field is required']
				},
				displayName: String,
				bio:String
});

const noop = function(){};

userSchema.pre('save', function(done) {
			var user = this;
			if(!user.isModified('password')){
							return done();
			}
			bcrypt.genSalt(saltFactor, function(err,salt){
				if(err){
								return done(err);
				}
				
				bcrypt.hash(user.password,salt,noop, function(err,hashedPassword){
							if(err){
											return done(err);
							}	
							
							user.password = hashedPassword;
							done();
				});
  });

});


userSchema.methods.checkPassword = function(guess, done){
		bcrypt.compare(guess, this.password, function (err, isMatch) {
			done(err, isMatch);			
		});		
};

userSchema.methods.name = function () {
		return this.displayName	 ||  this.firstname;	
};

const User = module.exports = mongoose.model('User', userSchema);
