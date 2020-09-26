const express = require('express');
const router = express.Router();

const AdminTASK = require("../models/Tasks");
const UserLOG = require("../models/User");
const Booked = require("../models/Book");
const mid = require("../middleware/auth");

// render admin dashboard
router.get('/adminDashboard',mid.hasAccess,mid.isAdmin,(req,res)=>
{
    res.render('Admin/adminDashboard'); 
});


// create a room form
router.get('/createRoom',mid.hasAccess,mid.isAdmin,(req,res)=>
{
    res.render('Tasks/createRoom');
}); 


// list all rooms
router.get('/list',mid.hasAccess,mid.isAdmin,(req,res)=>
{
    AdminTASK.find()
    .then(rooms=>
    {
        res.render('Tasks/listRoomNames',{
            listRooms: rooms
        });
    })
});


router.get('/listUsers',mid.hasAccess,mid.isAdmin,(req,res)=>
{
    UserLOG.find({admin: false})
    .then(users=>
    {
        res.render("Tasks/listUsers",
        {
            userList: users
        });
    })
    .catch(err=>console.log(`Error : ${err}`));

});


router.get('/listBooked',mid.hasAccess,mid.isAdmin,(req,res)=>
{
    let bookList = {};
    Booked.find()
    .then(booked=>
    {
        bookList.rooms = booked;
        res.render("Tasks/listBookedRooms",
        {
            bookINFO: bookList
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});



module.exports = router;