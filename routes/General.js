const express = require('express')
const router = express.Router();
const Book = require("../models/Book");
const Room = require("../models/Tasks");
const { sendEmail } = require("../modules/data-service");

router.get('/', (req,res)=>{

    Room.find()
    .then((rooms)=>
    {
        const roomsArray = [rooms[0],rooms[1],rooms[2]];
        res.render('General/home',{
            rooms: roomsArray
        });
    });

    
});

router.post('/', (req,res)=>
{
    if(req.body.where != null)
    {
        let roomINFO = 
        {
            whereIS: req.body.where,
            checkIN: req.body.checkin,
            checkOUT: req.body.checkout,
            guestNUMB: req.body.guests
        };

        Room.find({location: roomINFO.whereIS})
        .then((rooms)=>
        {
            let roomsAvailable = rooms;
            Book.find()
            .then(books=>
            {
                for(let i = 0; i < books.length; i++)
                {
                    for(let j = 0; j < roomsAvailable.length; j++)
                    {
                        if(books[i].roomTitle == roomsAvailable[j].roomTitle)
                        {
                            roomsAvailable.splice(j,1);
                        }
                    }
                }
            
                roomINFO.rooms = roomsAvailable;
                
                res.render("RoomListing/roomListing",
                {
                    bookINFO: roomINFO
                });
            })
            .catch(err=>console.log(`Error :${err}`));
        })
        .catch(err=>console.log(`Error :${err}`));
    }
    else
    {
        res.redirect("/roomlisting/roomListing");
    }
});


// Processing the registration form
router.post('/contact',(req,res)=>{
    
    //create an array to hold the error messages
    const errors = [];  

    const newMessage = 
    {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };

    if(newMessage.name == ""){
        errors.push("Please enter your Name");
    }

    if(newMessage.email == ""){
        errors.push("Please enter your Email");
    }

    if(newMessage.message == ""){
        errors.push("Please enter your Message");
    }

    if(errors.length == 0)                
    {
        // --------------- SEND EMAIL TO dibe ------------------
        let subject = `Contact from Dibe-AirBNB`;
        let message = `Message from: ${newMessage.name}\nEmail: ${newMessage.email}\n\n${newMessage.message}`;
        sendEmail(newMessage.email, process.env.MAIL_FROM, subject, message);

        // --------------- SEND EMAIL CONFIRMATION TO THE SENDER ------------------
        subject = `Contact from Dibe-AirBNB`;
        message = `Thank-you for contacting through Dibe-AirBNB!\n
        This Email is a confirmation that your message was successfully sent!\n
        /***** MESSAGE DETAILS *****/\n
        From: ${newMessage.name}\n
        Email: ${newMessage.email}\n\n
        Message Content: ${newMessage.message}\n
        /***************************/`;
        sendEmail(process.env.MAIL_FROM, newMessage.email, subject, message);
    }


    res.redirect("/");
});    

router.use((req, res) => 
{
    res.status(404).render('General/404');
});

module.exports=router;