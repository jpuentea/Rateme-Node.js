var express = require('express'); // using module express
var cookieParser = require('cookie-parser'); // using module express
var bodyParser = require('body-parser'); //using module body-parser, it allows to parse posts
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session'); //allows to create a session
// With mongoose we store data in de data base
var mongoose = require('mongoose');
var MongoSotore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');


var app = express();

//Creation of the data base, we only use 1 database, if we needed more, we will use mongoose.createconnections
mongoose.connect('mongodb://localhost/rateme');

//requerimos el fichero passport
require('./config/passport');



//middlewares
app.use(express.static('public'));//enable use static files placed in folder public
app.engine('ejs',engine);
app.set('view engine', 'ejs'); //look for files in views folder
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());




//properties of our express session
app.use(session({
	secret: 'testkey',
	reseave: false,
	saveUnitialized: false,
	store: new MongoSotore({mongooseConnection: mongoose.connection})
}));

//middleware para flash y passport despues de la session

app.use(flash());

app.use(passport.intialize());
app.use(passport.session());

require('./routes/user.js')(app);


// Server
app.listen(3000,function(){
	console.log("App running on port 3000");
});