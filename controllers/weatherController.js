const request = require('request');
const express = require('express');
const path = require('path');
const fs = require('fs');
// import * from fs as fs;

const fm = require('formidable');

const app = express();

app.use(express.static(path.join(__dirname,'../public')));

// const api_key = process.env.API_KEY;
const api_key = "8398ee9f03a5fe1bad564b1c2af7c8b8";
const form = new fm.IncomingForm();
const process = (req, res) => {

    form.parse(req, (err, fields, files)=>{
        // console.log(files);
        // return
        let newName = `uploads/${files.passport.name}`;

        let currentName = files.passport.path;
        
        fs.rename(currentName, newName, (err, res)=>{
            console.log(err, "ERR")
            console.log(res,"RES");
        })

        let city = fields.city;
        let name = fields.full_name;
        let email = fields.email;
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        let options = {
            url: url,
            method: "GET",
            headers: {}
        }
        request(options, (err, result, body)=>{
            let resBody = JSON.parse(body);
            // console.log(body);
            let statement = `${name} from ${city}, your weather details goes thus:`;
            res.render('pages/home', {statement, result: resBody})
        })
    });
}

module.exports.process = process;




