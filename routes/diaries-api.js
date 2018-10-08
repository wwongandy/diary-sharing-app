let express = require('express');
let router = express.Router();

let Diary = require('../models/diaries-db');

/*
    Connecting to the local MongoDB server.
    Uses Mongoose to establish connections with MongoDB.

    TODO:
    This will be setup to use an actual mLab MongoDB later.
 */
let mongoose = require('mongoose');
mongoose.connect('');

let db = mongoose.connection;

db.on('error', err => {
    console.log(`Error found, unable to connect to ${db.name}.\n${err}`);
})

db.once('open', () => {
    console.log(`Success, connected to ${db.name}.`);
})