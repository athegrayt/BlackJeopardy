const mongoose = require('mongoose');
const {Schema} = mongoose

const scoreSchema = new Schema({
    score: Number, 
    date: Date
})