const mongoClient = require('mongodb').MongoClient;

const uri = process.env.URI;
const addCustomer = (req, res) => {
    mongoClient.connect(uri, (err, client) => {
        const db = client.db("ecommerce");

        let newCustomer = {}
        db.
    })
}

module.exports.addCustomer = addCustomer;