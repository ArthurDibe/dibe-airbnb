const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const path = require("path");
const UserLOG = require("../models/User");
const Room = require("../models/Tasks");
const Book = require("../models/Book");
const mid= require("../middleware/auth");

//This allows you to pefrom CRUD operations on the Room colections
router.post('/createRoom',mid.hasAccess,(req,res)=>
{
    const errors = [];

    const newRoom = 
    {
        roomTitle: req.body.roomTitle,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location
    };

    if(newRoom.roomTitle == "")
    {
        errors.push("Please enter a title");
    }

    if(newRoom.price == "")
    {
        errors.push("Please enter a price");
    }

    if(newRoom.description == "")
    {
        errors.push("Please enter a description");
    }

    if(newRoom.location == "")
    {
        errors.push("Please select a location");
    }

    if(req.files==null)
    {
        errors.push("Sorry you must upload a file");
    }   
    else///User uploaded file
    {   //check if the file is not an image
        if(req.files.roomPic.mimetype.indexOf("image") == -1)
        {
            errors.push("Sorry you can only upload images : Example (jpg,gif, png) ")
        }
    }

    // If there is any error
    if(errors.length > 0)
    {
        res.render("Tasks/createRoom",{
            message: errors,
            newRoom: newRoom
        });
    }
    else 
    {
        const room = new Room(newRoom);
        
        //create  new room
        room.save()
        .then(room=>
        { 
            //rename file to include the userid
            req.files.roomPic.name = `db_${room._id}${path.parse(req.files.roomPic.name).ext}`;
            
            //upload file to server
            req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
            .then(()=>
            {
                //Then is needed to refer to associate the uploaded image to the room
                Room.findByIdAndUpdate(room._id,{
                    roomPic: req.files.roomPic.name 
                })
                .then(()=>{
                    console.log(`File name was updated in the database`);
                    res.redirect("/admin/adminDashboard");  
                })
                .catch(err=>console.log(`Error :${err}`));
            });

        })
        .catch(err=>console.log(`Error :${err}`));

    }

});

// this will render the edit for for a specific room that have been chosen
router.get("/edit/:id",mid.hasAccess,mid.isAdmin,(req,res)=>
{
    Room.findById(req.params.id)
    .then((room)=>
    {
        res.render("Tasks/editRoom",{
            room: room
        });
    })
    .catch(err=>console.log(`Error :${err}`));
});


//Route to update a task based on the information entered in the task form
router.put("/updateRoom/:id",mid.hasAccess,mid.isAdmin,(req,res)=>
{
    Room.findById(req.params.id)
    .then((room)=>{

        room.roomTitle = req.body.roomTitle;
        room.price = req.body.price;
        room.description = req.body.description;
        room.location = req.body.location;
        
        // check if the user did not chose a new picture
        // if the user did chose another picture, then rename the file
        // to become an unique name
        if(room.roomPic != req.body.roomPic)
        {
            // update the name file to include the userid to u
            req.files.roomPic.name = `db_${room._id}${path.parse(req.files.roomPic.name).ext}`;
            
            // upload file to server
            req.files.roomPic.mv(`public/uploads/${req.files.roomPic.name}`)
            .then(()=>
            {
                console.log(`File name was updated in the database`);

                room.save()
                .catch(err=>console.log(`Error : ${err}`));
            })
            .catch(err=>console.log(`Error :${err}`));
        }
    })
    .catch(err=>console.log(`Error : ${err}`));
    res.redirect("/admin/adminDashboard");
});


router.get("/listBooked/:email",mid.hasAccess,(req,res)=>
{
    let roomINFO = {};
    
    Room.find()
    .then((rooms)=>
    {
        Book.find({userEmail: req.params.email})
        .then(books=>
        {
            let roomsBOOKED = [];
            for(let i = 0; i < books.length; i++)
            {
                for(let j = 0; j < rooms.length; j++)
                {
                    if(books[i].roomTitle == rooms[j].roomTitle)
                    {
                        roomsBOOKED.push(rooms[j]);
                    }
                }
            }
            roomINFO.rooms = roomsBOOKED;

            res.render("Tasks/listBookedRooms",
            {
                bookINFO: roomINFO
            }); 
        })
        .catch(err=>console.log(`Error : ${err}`));
    })
    .catch(err=>console.log(`Error : ${err}`));
});


//Route to direc to edit task form
router.get("/editUser/:id",mid.hasAccess,mid.isAdmin,(req,res)=>
{
    UserLOG.findById(req.params.id)
    .then((user)=>
    {
        res.render("Tasks/editUser",{
            userDocument: user
        })
    })
    .catch(err=>console.log(`Error : ${err}`));
});


//Route to update a task based on the information entered in the task form
router.put("/editUser/:id",mid.hasAccess,mid.isAdmin,(req,res)=>
{
    const errors = [];      
    
    const CurrentUser = 
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
    if(CurrentUser.email == ""){
        errors.push("Email was missing");
    }

    // * NAME VALIDATION ********************************************
    if(CurrentUser.fname == "" && CurrentUser.lname != ""){
        errors.push("First name was missing");
    } 
    else if(CurrentUser.fname != "" && CurrentUser.lname == ""){
        errors.push("Last name was missing");
    }
    else if(CurrentUser.fname == "" && CurrentUser.lname == ""){
        errors.push("Full name was missing");
    }

    // * PHONE VALIDATION ********************************************
    if(CurrentUser.phone == ""){
        errors.push("Phone number was missing");
    }


    // * PASSWORD VALIDATION ********************************************
    // check if is empty
    if(CurrentUser.passwd == ""){          
        errors.push("Password was missing");
    } 
    else 
    {
        // check if its size is less than 6
        if(CurrentUser.passwd.length < 6){     
            errors.push("Password must have at least 6 characters");
        }

        // check if its size is greater than 12
        if(CurrentUser.passwd.length > 12){    
            errors.push("Password must have a maximum size of 12 characters long");
        }

        // if password's size is 6 to 12 characters long, 
        //      then check if it has letters and numbers only
        if(CurrentUser.passwd.length >= 6 && CurrentUser.passwd.length <= 12) 
        {    
            let flag = false;
            for(let i = 0; i < CurrentUser.passwd.length && !flag; ++i)
                if(CurrentUser.passwd.charAt(i) < "a" || CurrentUser.passwd.charAt(i) > "z")
                    if(CurrentUser.passwd.charAt(i) < "A" || CurrentUser.passwd.charAt(i) > "Z")
                        if(CurrentUser.passwd.charAt(i) < "0" || CurrentUser.passwd.charAt(i) > "9")
                            flag = true;

            if(flag) errors.push("Password must contain letters and numbers only");
            else
            {
                if(CurrentUser.passwd != CurrentUser.passwdCONFIRM) errors.push("Password confirm not match !");
            }
    
        }
    }

    // * DATE OF BIRTH VALIDATION ********************************************
    if(req.body.month == 0 || req.body.day == 0 || req.body.year == 0)
    {
        errors.push("Date of birth was missing");
    } 
    else 
    {
        let today = new Date();
        let currentYear = parseInt(today.getFullYear());
        const age = currentYear - parseInt(req.body.year);
        if(age < 18) errors.push("You must be at least 18 years old");
    }

    // If there are error messages inside the array
    //      pass the errors to the message page with the object literal
    if(errors.length > 0)                
    {
        res.render("Tasks/editUser", 
        {     
            message: errors,
            newUser: newUser
        });
    } 
    else 
    {
        UserLOG.findById(req.params.id)
        .then((currentUser)=>
        {
            currentUser.email=req.body.email;
            currentUser.first_name=req.body.fname;
            currentUser.last_name=req.body.lname;
            currentUser.phone_number=req.body.phone;
            currentUser.day_DOB=req.body.day;
            currentUser.month_DOB=req.body.month;
            currentUser.year_DOB=req.body.year;

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.passwd,salt);
            currentUser.password=hash;
            currentUser.save()
            .then(()=>{
                res.redirect("/admin/adminDashboard");
            })
            .catch(err=>console.log(`Error : ${err}`));
        })
        .catch(err=>console.log(`Error : ${err}`));
    }
});


//Route used to delete room 
router.delete("/delete/:id",mid.hasAccess,(req,res)=>
{
    Room.deleteOne({_id:req.params.id})
    .then((room)=>
    {
        res.redirect("/admin/list");
    })
    .catch(err=>console.log(`Error : ${err}`));
});

//Route used to delete room 
router.delete("/deleteBook/:roomTitle",mid.hasAccess,(req,res)=>
{
    console.log(req.params.roomTitle)
    Book.deleteOne({roomTitle:req.params.roomTitle})
    .then((room)=>
    {   
        res.redirect("/admin/listBooked");
        //res.redirect("/admin/listBooked/task/listBooked/{{user.email}}");
    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;