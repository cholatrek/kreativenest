const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema  = new Schema({

    name : {
        type: String,

    },
    email: {
        type:String
    },

    message:{
        type:String
    }
});

module.exports = mongoose.model('contact', contactSchema)

