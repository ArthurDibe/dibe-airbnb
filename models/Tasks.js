const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema (rules for the collection)
const RoomSchema = new Schema({
    roomTitle:
    {
        type: String,
        required: true
    },
    price:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    location:
    {
        type: String,
        required: true
    },
    roomPic:
    {
        type: String
    },
    dateCreated:
    {
        type:Date,
        default: Date.now()
    }
});

const roomModel = mongoose.model("Rooms", RoomSchema);

module.exports=roomModel;