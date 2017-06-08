//haremos uso de passport local.

var passport = require('passport');
//usamos passport-local estrategia
var localStrategy = require('passport-local').Strategy;

//requerimos el modelo de user.js donde esta el esquema de mongo, para poder usar el esquema

var User = require('../models/user')

//creamos dos metodos
//coge el usuario y lo mete en la sesion, guardamos user.id en la sesion
passport.serializeUser((user,done) => {
	done(null,user.id);
});
//el id guardado en la sesion se pasa en como argumento, done es el callbaack
passport.deserializeUser((id,done) => {
	//buscamos en el modelo, lo que hace esto es tras haber guardado 
	// el id en la bd lo busca en la base de datos, cuando lo encuentra guarda todos los datos en el dato user
	User.findById(id, (err,user) =>{
		done(err,user);
	});
	
});

//usamos el middleware passport
passport.use('local.signup', new localStrategy({
	username: 'email',
	passwordField: 'password',
	passReqToCallbback: true
}, (req,email,password,done)=> {
	//chequeamos si ya existe en la bd, si existe llamamos al callback user que avisara
	User.findOne({'email':email}, (err, user) => {
		//si hay error
		if(err){
			return done(err);
		}
		//si existe usuario
		if(user){
			return done(null,false);
		}
		//si no existe creamos usuario y guardamos en bd
		var newUser = User();
		//con el bodyparser cogemos el argumento fullname que estará en views signup.ejs
		newUser.fullname = req.body.fullname;
		newUser.email = req.body.email;
		newUser.password = encryptPassword(req.body.password);
		//tendremos que encriptarla con un modulo que existe (bcrypt)

		newUser.save((err) => {
			return done(null, newUser);
		});


	})
}))