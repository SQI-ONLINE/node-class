'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const routes = require('./routes/routes');
const path = require('path');
const dotenv = require('dotenv').config();

const fs = require('fs');

const process = require('process');
    
const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs')

const addTime = (req, res, next) => {
    req.request_time = Date.now()
    console.log(Date.now())
    next()
}


app.use('/about',addTime);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    // console.log(global);
    // console.log(`Worker ${cluster.worker.id} working!`)
    res.render('pages/chat')
    // fs.readFile('test.txt', 'utf-8',(err, data)=>{
    //     // let content = data;
    //     // console.log(content);
    //     // let newText = ", welcome";
    //     // fs.writeFile('test.txt', data+newText, (err, res)=> {
    //     //     fs.rename('test.txt','newFile.txt',(err, res)=>{

    //     //     })
    //     // });

    // })
    // fs.exists('newFile.txt', (state)=>{
    //     res.send(state);
    // })
    // fs.open('newFile.tx', (err, data)=>{
    //     // res.send(JSON.stringify(err));
    //     if(err){
            
    //     }
    // })
    // fs.mkdir
    // var text = fs.readFileSync('test.txt')

    // var text = "THIS IS THE NEW CONTENT";

    // console.log(text);
    // res.send("OKAY!")

})

app.get('/about', (req, res)=>{
    // console.log(;
    res.render('pages/about')
})

app.use('/weather', routes);

const connection = app.listen(port, (req, res)=>{
    console.log(`Server started and listening on port ${port}`)
})

const io = require('socket.io')(connection);

io.on('connection', (socket)=>{
    console.log("New User Connected")

    
    socket.on('newMsg', (data)=>{
        let date = new Date().toLocaleTimeString();
        if(data.message > 0){
            socket.broadcast.emit('newMessage', {content: data.message, time: date})
        }
    })

    // socket.emit('messageReceived', {status: "OK"})

})


