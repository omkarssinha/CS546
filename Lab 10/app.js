const express = require('express');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs= require('express-handlebars');

app.use('/public', static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 }
  }));

  app.use('/', async (req,res,next)=>{
    let user_status;
    if(req.session.user)
    user_status="User is logged in";
    else
    user_status="User is not logged in";

    console.log(new Date().toUTCString());
    console.log(req.method);
    console.log(req.originalUrl);
    console.log(user_status);
    next();
  });

  app.use('/private', async (req,res,next)=>{
    //console.log(req.session.id);
    if(!req.session.user)
    return res.status(403).render("error", {title:"User not logged in"});
    else
    next();
  });

configRoutes(app);

app.listen(3000,() => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});