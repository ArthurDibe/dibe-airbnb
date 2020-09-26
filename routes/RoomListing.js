const express = require('express');
const router = express.Router();
const Book = require("../models/Book");
const Room = require("../models/Tasks");


router.get('/roomListing', (req,res)=>
{
    let roomINFO = {};

    Room.find()
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
});

module.exports=router;