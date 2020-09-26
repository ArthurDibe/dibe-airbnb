const mongoose = require("mongoose");
const chalk = require('chalk'); // to style console.log texts
var nodemailer = require('nodemailer');

require("dotenv").config({path:'./config/keys.env'});


// Function to initialize DATABASE
const initDatabase = ()=>
{
    const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@dibe-airbnb-2uva3.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`;

    mongoose.set('useCreateIndex', true); // fixing the deprecate from mongoose
    mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(chalk.yellow(`Dibe-AirBNB database:`), chalk.green(` SCCESSFULLY connected to the database !`));
        console.log(chalk.yellow(`Time:`), chalk.green(new Date().toLocaleTimeString()));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    })
    .catch((err)=>{
        console.log(chalk.yellow(`Dibe-AirBNB database:`), chalk.red(` ERROR ${err}`));
        console.log(chalk.blue(`------------------------------------------------------------------------------------`));
    });
}

const sendEmail = (emailFROM, emailTO, SUBJECT, MESSAGE)=> {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.MAIL_PASSWORD
        }
        });

        var mailOptions = {
        from: emailFROM,
        to: emailTO,
        subject: SUBJECT,
        text: MESSAGE
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
        console.log("message sent!")
}

module.exports = {
    initDatabase: initDatabase,
    sendEmail: sendEmail
};