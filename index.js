'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const passport = require('passport');
const process = require('process');
    


const routes = require('./routes/routes');
const path = require('path');
const dotenv = require('dotenv').config();

const sequelize = require('sequelize');
const mongoose = require('mongoose');

global.sequelize = sequelize;

const fs = require('fs');
const port = process.env.PORT;
const app = express();
const connection = app.listen(port, (req, res)=>{
    console.log(`Server started and listening on port ${port}`)
})

require('./config/passport')(passport);

const User = require('./models/users.model')
// const mysql = require('mysql');
// const mysql2 = require('mysql2');



app.set('view engine', 'ejs')

const addTime = (req, res, next) => {
    req.request_time = Date.now()
    console.log(Date.now())
    next()
}

// const con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root_root',
//     database: 'test'
// })

// con.connect((err)=>{
//     if(err){
//         console.log(err);
//         console.log("An error occured")
//         return;
//     }
//     console.log("Conection Established")
// })

// const pool = mysql2.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root_root',
//     database: 'test'
// })

// global.pool = pool;

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const setRequestHeaders = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
}

app.use(setRequestHeaders)
app.use('/about',addTime);
app.use(passport.initialize());
const dbRoute = require('./routes/db')

// app.use('/db', dbRoute)

const uri = "mongodb+srv://favour861:1234567890@cluster0.yszb7.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });


global.User = User;

app.get('/', (req, res) => {
    res.render('pages/signup')
})

app.get('/signin', (req, res) => {
    res.render('pages/login')
})

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    let new_user = { firstName, lastName, email, phone, password };
    new_user = new User(new_user);
    new_user.save();

    res.render('pages/signup', {message: "Signed up successfully "})
})

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard');
})

app.post('/signin', (req, res, next) => {
    console.log("REACHING HERE");
})

const userRoute = require('./routes/userRoute')
app.use('/user', userRoute)
app.post('/addUser', (req, res) => {
    console.log(req.body)
    let response = {success: true, message: "Reaching Endpoin"}
    res.send(response)
})

app.get('/users', (req, res) => {

    let author_id = 1; // 1; drop authors

    try {
        con.query(`SELECT * FROM authors WHERE author_id = ${mysql.escape(author_id)}`, (err, rows)=>{
            if(err) throw err;
        })
    } catch (error) {
        
    }

    con.query(`SELECT * FROM authors WHERE author_id = ?`, [author_id], (err, rows)=>{
        console.log(rows);
    })

    con.query(`INSERT INTO authors (author_name, author_phone) values (${name}, ${phone})`, (err, row)=>{
        if(err){
            console.log("")
        }
    })

    let author = {author_name: "David", author_phone: 8090909090}
    con.query(`INSERT INTO authors SET ?`, author, (err, row)=>{
        if(err){
            console.log("")
        }
    })

    con.query(`UPDATE authors SET author_name = ?, author_phone = ? WHERE author_id = ?`, [name, phone, author_id], (err, res)=> {

    })

    con.query(`DELETE FROM authors where author_id = ?`, [author_id], (err, res)=>{
        // ...
    })
    // let users = ["Favour","Ridwan","King D", "Star P", "David", "Atom", "Medilley", "Taiwo"];

    // res.status(401).send(users);
    // res.end()
})

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



const io = require('socket.io')(connection);

io.on('connection', (socket)=>{
    console.log("New User Connected")

    
    socket.on('newMsg', (data)=>{
        let date = new Date().toLocaleTimeString();
        if(data.message > 0){
            socket.broadcast.emit('newMessage', {content: data.message, time: date})
        }
    })

    socket.on('frontendSpeaking', (data)=>{
        console.log(data);
        // socket.emit("backendSpeaking", {message: "Hi"});
    })

    socket.emit("backendSpeaking", {message: "Hi"});


    // socket.emit('messageReceived', {status: "OK"})

})


