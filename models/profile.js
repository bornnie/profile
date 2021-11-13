const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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
				bio:String,
				displayName:String
});

userSchema.pre('save', function(done) {
			var user = this;
			if(!user.isModified('passwordd')){
							return done();
			}
});

const saltFactor = 10;
const noop = function () {};

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

userSchema.methods.checkPassword = function(guess, done){
		bcrypt.compare(this.password, guess, function (err, isMatch) {
			done(err, isMatch);			
		});		
};

userSchema.methods.name = function () {
		return this.displayName	 ||  this.firstname;	
};

const User = module.exports.mongoose.model('User', userSchema);