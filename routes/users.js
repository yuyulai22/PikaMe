var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var multer = require('multer');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login',{title:'Login'});
});



router.post('/login',passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),

  function(req, res) {
  	console.log('you are logged in');
 	req.flash('success','You are now logged in', req.body.username);
 	res.redirect('/');
  });


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function(username, password, done){
	User.getUserByUsername(username,function(err,user){
		if(err) throw err;
		if(!user){
			return done(null, false, {message: 'Unknown User' });
		}
		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) return done(err);
			if(isMatch){
				return done(null, user);
			}else{
				return done(null, false, {message: 'invalid password'});
			}
		});
	});
}));

router.post('/register' , function(req, res, next) {
	//console.log(req.body.name);
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	console.log("req file is " , name, " email is ", email);

	//form validator 
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required').notEmpty();
	req.checkBody('email','Email field is not valid').isEmail();
	req.checkBody('username','Username field is required').notEmpty();
	req.checkBody('password','Password field is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(req.body.password);

	//check errors 
	var errors = req.validationErrors();
	console.log(errors);
	if(errors){
		//console.log('Errors');
		res.render('register',{
			errors: errors
		});
	}else{
		console.log('no errors');
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success', 'You are now registered and can login');

		res.location('/');
		res.redirect('/');

	}
});

router.get('/logout', function(req,res){
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/users/login');
})
//this allows us to accesss it from a different file
module.exports = router;
