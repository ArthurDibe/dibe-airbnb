const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const chalk = require('chalk'); // to style console.log texts
const methodOverride = require('method-override');
const fileupload = require("express-fileupload");
const session = require("express-session");

// data service that contains the function to initialize the connection to database
const dataService = require("./modules/data-service.js");

//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

// imorting the routes
const user = require('./routes/User');
const admin = require('./routes/Admin');
const generalRoutes = require('./routes/General');
const task = require('./routes/Task');
const roomListing = require('./routes/RoomListing');


// Create and Object of type EXPRESS
const app = express();

// This tells Express that I want to use HANDLEBARS as my TEMPLATING ENGINE !!!!!!!!!!
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//This tells EXPRESS to pass all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }));

//This is how you map your file upload to express
app.use(fileupload())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


// Load static assets, such CSS Files, Images, Front-End JS, etc...
app.use(express.static('public'));


//session
// Session FOR LOGIN
app.use(session({
    secret: process.env.SECRET_KEY_SESSION, //secret name for the cookie session
    name:   process.env.NAME_SESSION,
    resave: true,
    saveUninitialized: true
}))

app.use((req,res,next)=>{

    //This is a global variable that can be accessed by templates
    res.locals.user = req.session.userInfo;
    next();
})


// Modularized routes to look into folders 
app.use("/user", user);
app.use("/admin", admin);
app.use("/task", task);
app.use("/roomlisting", roomListing);
app.use("/", generalRoutes);

// initialize the connection with MongoDB
dataService.initDatabase();

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>
{
    console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    console.log(chalk.yellow(`WEB SERVER:`), chalk.green(` STARTED AT PORT ${PORT}`));
});