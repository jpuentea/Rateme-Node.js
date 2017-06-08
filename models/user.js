//creamos el modelo de usuario

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

//creamos el esquema
//dentro del metodo schema metemos un objeto y se meten los campos deseados, guardaremos fullname, password,email.
var userSchema = mongoose.Schema({

	fullname: {type: String, required:true},
	email: {type: String, required:true},
	password: {type: String},
	role:{type:String,default: ''},
	company:{
		name:{type:String, default: ''},
		image:{type:String, default: ''}
	},
	passwordResetToken: {type:String, default:''},
	passwordResetExpires: {type:Date, default: Date.now}

}); 

//hacemos uso de bcrypt
//este metodo encripta la password que se le pasa

userSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

//exportamos el schema

module.exports = mongoose.model('User, userSchema');