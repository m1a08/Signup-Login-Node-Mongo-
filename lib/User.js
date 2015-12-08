var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var userSchema = new mongoose.Schema({
	userName: {type: String, unique: true},
	password: {type: String},
	firstName: String,
	lastName: String
});

var User = mongoose.model('myusers', userSchema);
module.exports = User;