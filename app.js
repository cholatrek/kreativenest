const express = require('express');
const app = express();
const ejs  = require('ejs');
const secret = require('./config/secret');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const flash = require('flash');
const passport= require('passport');
const mongoose =  require('mongoose');
// const MongoStore = require ('connect-mongo')(session);
app.use(express.static('public'))
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');



app.use(cookieParser() );
app.use(session({
     resave:true,
     saveUninitalized: true,
     secret:secret.secretkey,
    //  store: new MongoStore({url:secret.database, autoReconnect:true})
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.user = req.user;
    next(); 
  });
  
  app.use(function(req,res,next){
    res.locals.user = req.user;
    next(); 
  });
  
  
  mongoose.connect(secret.database, {useUnifiedTopology: true});
  
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("we are already connected to the server database")
  });


//configuration of the controllers
const pageControllers = require('./controller/pageRoutes')
app.use('/', pageControllers);

const userRoutes = require('./controller/user');
app.use('/', userRoutes)

const adminControllers = require('./controller/adminRoutes')
app.use('/admin', adminControllers);

const portfolioContoller = require('./controller/portfolioController');
app.use('/admin', portfolioContoller);

const landingControllers = require('./controller/landingpageController')
app.use('/admin', landingControllers);

const contactControllers = require('./controller/contactroute')
app.use('/', contactControllers);

app.listen(secret.port, ()=>{
    console.log("this is the server currently running ")
})