const express = require('express');
const router = express.Router();
const chalk = require('chalk'); // to style console.log texts
const bcrypt= require("bcryptjs");
const UserLOG = require("../models/User");
const Book = require("../models/Book");
const mid = require("../middleware/auth");
const { sendEmail } = require("../modules/data-service");

//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

//// load kkeys as nodejs style
//const keys = require('../config/keys.js');

router.get('/registration',(req,res)=>
{
    res.render('User/registration');
});

router.get('/login',(req,res)=>
{
    res.render('User/login');
});

router.get('/userDashboard',mid.hasAccess,mid.isUser,(req,res)=>
{
    res.render('User/userDashboard');
});



// Processing the registration form
router.post('/registration',(req,res)=>{
    
    //create an array to hold the error messages
    const errors = [];      
    
    const newUser = 
    {
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        passwd: req.body.passwd,
        passwdCONFIRM: req.body.passwdCONFIRM,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
    };

    /* ************************** FORM VALIDATION ****************************** */
    // * EMAIL VALIDATION ********************************************
    if(newUser.email == ""){
        errors.push("Email was missing");
    }

    // * NAME VALIDATION ********************************************
    if(newUser.fname == "" && newUser.lname != ""){
        errors.push("First name was missing");
    } 
    else if(newUser.fname != "" && newUser.lname == ""){
        errors.push("Last name was missing");
    }
    else if(newUser.fname == "" && newUser.lname == ""){
        errors.push("Full name was missing");
    }

    // * PHONE VALIDATION ********************************************
    if(newUser.phone == ""){
        errors.push("Phone number was missing");
    }


    // * PASSWORD VALIDATION ********************************************
    // check if is empty
    if(newUser.passwd == ""){          
        errors.push("Password was missing");
    } 
    else {
        // check if its size is less than 6
        if(newUser.passwd.length < 6){     
            errors.push("Password must have at least 6 characters");
        }

        // check if its size is greater than 12
        if(newUser.passwd.length > 12){    
            errors.push("Password must have a maximum size of 12 characters");
        }

        // if password's size is 6 to 12 characters long, 
        //      then check if it has letters and numbers only
        if(newUser.passwd.length >= 6 && newUser.passwd.length <= 12) {    
            let flag = false;
            for(let i = 0; i < newUser.passwd.length && !flag; ++i)
                if(newUser.passwd.charAt(i) < "a" || newUser.passwd.charAt(i) > "z")
                    if(newUser.passwd.charAt(i) < "A" || newUser.passwd.charAt(i) > "Z")
                        if(newUser.passwd.charAt(i) < "0" || newUser.passwd.charAt(i) > "9")
                            flag = true;

            if(flag) errors.push("Password must contain letters and numbers only");
            else
            {
                if(newUser.passwd != newUser.passwdCONFIRM) errors.push("Password confirm not match !");
            }
    
        }
    }

    // * DATE OF BIRTH VALIDATION ********************************************
    if(req.body.month == 0 || req.body.day == 0 || req.body.year == 0){
        errors.push("Date of birth was missing");
    } 
    else {
        let today = new Date();
        let currentYear = parseInt(today.getFullYear());
        const age = currentYear - parseInt(req.body.year);
        if(age < 18) errors.push("You must be at least 18 years old");
    }

    // If there are error messages inside the array
    //      pass the errors to the message page with the object literal
    if(errors.length > 0)                
    {
        res.render("User/registration", {     
            message: errors,
            newUser: newUser
        });
    } 
    else {

        const dataFORM = 
        {
            email : req.body.email,
            first_name : req.body.fname,
            last_name : req.body.lname,
            phone_number : req.body.phone,
            month_DOB : req.body.month,
            day_DOB : req.body.day,
            year_DOB : req.body.year
        };

        // encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.passwd,salt);

        dataFORM.password = hash;
        
        // ******************* REGISTRATION DATA TO MONGODB DATABASE ********************************

        // CREATE OBJECT TO HOLD THE DATA TO BE SENT TO MONGODB


        // CREATION OF A NEW DOCUMENT (RECORD)
        // the schema UserLOG model is comming from /models/User.js
        const task = new UserLOG(dataFORM); 
                
        // if save() succeeds, print registration suceeded
        //                     else error message

        task.save()
        .then(() =>
        {                  
            console.log(chalk.magenta(`User registration:`),chalk.green(` Registration completed and database's document created!`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
            
            // --------------- SEND EMAIL CONFIRMATION TO THE SENDER ------------------
            subject = `Dibe-AirBNB - Registration Complete`;
            message = `Thank-you for registering in Dibe-AirBNB!\n
            This Email is a confirmation that you have successfully registered!\n\n
            You are ready to go! Enjoy!`;
            sendEmail(process.env.MAIL_FROM, newUser.email, subject, message);
        
            // --------------- NOTIFY THE WEBMASTER ABOUT SOMEONE REGISTERING ---------
            subject = `Someone registered at Dibe-AirBNB !`;
            message = `${newUser.fname} ${newUser.lname} have just registered at Dibe-AirBNB\n
            with the email ${newUser.email}`;
            sendEmail(process.env.MAIL_FROM, process.env.MAIL_FROM, subject, message);
            
            // REDIRECT THE USER TO THE DASHBOARD ROUTE
            res.redirect("/");
        })
        .catch(err=>
        {
            console.log(chalk.magenta(`User registration:`),chalk.red(` ERROR ${err}`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
                    
            errors.push(`${req.body.email} already registered!`);
            res.render("User/registration",
            {
                newUser: newUser,
                message: errors
            });
        });   
    }

    
}); // end of post registration




// Processing the registration form
router.post('/login', (req,res)=>{
    
    //create an array to hold the error messages
    const errors = [];
    const logFormData = {
        email : req.body.email,
        password : req.body.passwd
    }

    /* ************************** FORM VALIDATION ****************************** */
    // * EMAIL VALIDATION ********************************************
    if(logFormData.email == ""){
        errors.push("Please enter email");
    }

    // * PASSWORD VALIDATION ********************************************
    // check if is empty
    if(logFormData.password == ""){          
        errors.push("Please enter password");
    } 

    // If there are error messages inside the array
    //      pass the errors to the message page with the object literal
    if(errors.length > 0)                
    {
        res.render("User/login", {     
            message: errors,
            userLOGIN: req.body
        });
    } 
    else
    {
        UserLOG.findOne({email: logFormData.email})
        .then((user)=>
        {
            if(user==null)
            {
                errors.push(`Sorry, you entered the wrong username and/or password`);
                res.render("User/login",{
                    message : errors
                });
            }
            else    // when user exists
            {
                bcrypt.compare(logFormData.password,user.password)
                .then(isMatched=>
                {
                    if(isMatched==true) //continue listen audio from minute 30
                    {
                        req.session.userInfo = user;
                        if(user.type == "User")
                        {
                            res.redirect("/user/userDashboard");
                        }
                        else if(user.type == "Admin")
                        {
                            res.redirect("/admin/adminDashboard");
                        }
                            
                    }
                    else
                    {
                        errors.push("Sorry, your password does not match");
                        res.render("User/login",
                        {
                            message: errors
                        });
                        
                    }

                })

            }


        })
        .catch((err)=>
        {
            console.log(chalk.magenta(`LOGIN:`),chalk.red(` ERROR ${err}`));
            console.log(chalk.blue(`------------------------------------------------------------------------------------`));
        });
    }
}); // end of post login


// User Book a Room
//router.get("/bookRoom/:email",hasAccess,(req,res)=>
router.get("/bookRoom",mid.hasAccess,(req,res)=>
{
    const newBook =
    {
        roomTitle: req.query.roomTitle,
        userEmail: req.query.userEmail,
        location: req.query.roomLocation
    };

    UserLOG.findOne({email: newBook.userEmail})
    .then(user=>
    {   
        const book = new Book(newBook);
        book.save()
        .then(()=>{
            if(req.session.userInfo.admin == true)
            {
                res.redirect("/admin/adminDashboard");
            }
            else
            {
                res.redirect("/user/userDashboard");
            }
        })
        .catch(err=>console.log(`Error :${err}`));
    })
    .catch(err=>console.log(`Error :${err}`)); 
});


router.get("/logout",(req,res)=>{

    //This destorys the session
    req.session.destroy();
    res.redirect("/user/login");

});


module.exports = router;