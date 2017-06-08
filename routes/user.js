module.exports = (app) =>{
	
app.get('/', (req,res,next) => {
	res.render('index', {title: 'Index || Rateme'});
});

app.get('/signup', (req,res) => {
	res.render('user/signup', {title: 'signup || Rateme'});
});
//metodo post al que se llama cuando se autentica, se le pasa local.signup que es el nombre puesto en el config/passport.js
app.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash: true
}));

app.get('/login', (req,res,next) => {
	res.render('user/login', {title: 'login || Rateme'});
});

}