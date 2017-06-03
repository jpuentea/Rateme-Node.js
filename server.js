var express = require('express'); // using module express
var cookieParser = require('cookie-parser'); // using module express
var bodyParser = require('body-parser'); //using module body-parser, it allows to parse posts
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session'); //allows to create a session


var app = express();

//middlewares
app.use(express.static('public'));//enable use static files placed in folder public
app.engine('ejs',engine);
app.set('view engine', 'ejs'); //look for files in views folder
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());

//create a route
app.get('/', function(req,res,next){
	res.render('index');
})



// Server
app.listen(3000,function(){
	console.log("App running on port 3000");
})