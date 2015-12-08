var express = require('express');
var router = express.Router();
var User = require('../lib/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;
	User.findOne({userName: userName, password: password}, function(err, user){
		if(err){
			console.log(err);
			res.status(500).send();
		}
		if(!user){
			res.status(404).send();			
		}
		req.session.user = user;
		res.status(200).send();
	});
});

router.get('/dashboard', function(req, res){
	if(!req.session.user){
		res.status(401).send();
	}else{
		res.status(200).send("Welcome to API");
	}

	
});

router.get('/logout', function(req, res){
	req.session.destroy();
	res.status(200).send();
});

router.post('/register', function(req,res){
	var userName = req.body.userName;
	var password = req.body.password;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var newUser = new User();
	newUser.userName = userName;
	newUser.password = password;
	newUser.firstName = firstName;
	newUser.lastName = lastName;

	newUser.save(function(err, saveUser){
		if(err){
			console.log(err);
			res.status(500).send();
		}else{
			res.status(200).send();
		}
	});
});

module.exports = router;
