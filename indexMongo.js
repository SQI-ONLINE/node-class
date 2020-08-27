const express = require('express');
const app = express();
require('dotenv').config();
const cluster = require('cluster');
const mongoose = require('mongoose');
// const EventEmitter = require('events');


// const event = new EventEmitter();

// event.on('eat', ()=>{
//     console.log("eating");
// })

// event2.emit('eat')




// const uri = "mongodb+srv://favour861:12345Aa.@class1.btjio.mongodb.net/class1?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/class1";

const uri = process.env.URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('connected', ()=>console.log("Connected to database"))
db.on('error', ()=>{console.log("Error occurred")})


const storeRoutes = require('./routes/store.route')
app.use('/store',storeRoutes)

const port = process.env.PORT;
app.listen(port, (err, res)=>{
    console.log(`SERVER STARTED AND LISTENING ON PORT ${port}`)
})
