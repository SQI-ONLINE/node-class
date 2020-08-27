const express = require('express');
const app = express();
require('dotenv').config();
const cluster = require('cluster');
const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

// const uri = "mongodb+srv://favour861:12345Aa.@class1.btjio.mongodb.net/class1?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/class1";
const uri = process.env.URI;
if(cluster.isMaster){
    const os = require('os');
    const numCPU = os.cpus().length;
    
    for(i=1; i<=numCPU;i++){
        cluster.fork();
    }
    
    cluster.on('online', (worker)=>{
        console.log(`WORKER ${worker.id} STARTED`)
    })
    
    cluster.on('exit', (worker)=>{
        console.log(`Worker ${worker.id} DIED`);
        cluster.fork();
    })
}else{

    app.get('/', (req, res)=>{
        mongoClient.connect(uri, (err, client)=>{
            if(err) throw err;
            const db = client.db("ecommerce");
            db.createCollection("customers", (err, res) => {
                if(err) throw err;
            })
            console.log("CONNECTED TO DATABASE");
            
        })
        // console.log(os.cpus());
        // console.log(`WORKING ON WORKER ${process.id}`)

        // res.send("LOGGED OS TO THE CONSOLE");
    })

    app.post('/addCustomer', (req, response)=>{
        mongoClient.connect(uri, (err, client)=>{
            const db = client.db('ecommerce');
            let newCustomer = {name: "Taiwo", email: "medillery", phone: "atom", address: "President"};
            let customers = [
                {name: "Taiwo", email: "medillery", phone: "atom", address: "President"},
                {name: "King D", email: "royal", phone: "snr dev", address: "hrm"},
                {name: "Ridwan", email: "star p", phone: "snr dev", address: "nlv"}
            ]
            db.collection('customers').insertMany(customers, (err, res)=>{
                if(err) throw err;
                console.log(res);
                console.log("INSERTED A NEW DOCUMENT")
                response.send("INSERTED A NEW DOCUMENT")
            })
        })
    })

    app.get('/customers', (req, response)=>{
        mongoClient.connect(uri, (err, client)=>{
            const db = client.db('ecommerce');
            let sort = {email: 1};
            let customers = db.collection('customers').find({}).sort(sort);
            customers.forEach(c => {
                console.log(c);
            });
            // customers.
        })
    })

    app.get('/customer/:email', (req, response)=>{
        mongoClient.connect(uri, (err, client)=>{
            const db = client.db('ecommerce');
            let email = req.params.email;
            let query = {$or: [{age: 5}, {email: "email"}]};
            let customer = db.collection('customers').findOne(query).then(res=>console.log(res));

            // let 
            // console.log(customer);
            // customers.
        })
    })

    app.get('/updateCus/:email', (req, response)=>{
        mongoClient.connect(uri, (err, client)=>{
            const db = client.db('ecommerce');
            let email = req.params.email;
            
            let update =db.collection('customers').update({email: email},{$set: {address: "SQI"}})
            

           update.then(res=>{
               console.log(res);
               response.send(res);
           })
            // let 
            // console.log(customer);
            // customers.
        })
    })

    app.get('/deleteCus/:email', (req, response)=>{
        mongoClient.connect(uri, (err, client)=>{
            const db = client.db('ecommerce');
            let email = req.params.email;
            
            let deleteCus = db.collection('customers').deleteMany({email: email})
            

           deleteCus.then(res=>{
               console.log(res);
               response.send(res);
           })
            // let 
            // console.log(customer);
            // customers.
        })
    })
    
    // const ecommerce = require('./routes/ecommerce')
    // app.use('/ecommerce', ecommerce)
    
    const port = process.env.PORT;
    app.listen(port, (err, res)=>{
        console.log(`SERVER STARTED AND LISTENING ON PORT ${port}`)
    })

}