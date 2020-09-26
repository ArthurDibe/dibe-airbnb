const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema (rules for the collection)
const LogSchema = new Schema({
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    first_name:
    {
        type: String,
        required: true
    },
    last_name:
    {
        type: String,
        required: true
    },
    phone_number:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    month_DOB:
    {
        type: Number,
        required: true
    },
    day_DOB:
    {
        type: Number,
        required: true
    },
    year_DOB:
    {
        type: Number,
        required: true
    },
    type:
    {
        type: String,
        default: "User"
    },
    admin:
    {
        type: Boolean,
        default: false
    },
    dateCreated:
    {
        type:Date,
        default: Date.now()
    }
});

// INSTANTIATION OF A MODEL
//      create model (representation of the collection)
//      everytime the form is sent, a document will be created and stored in collection
const userMODEL = mongoose.model('log', LogSchema);    // collection name will be 'task'

module.exports=userMODEL;