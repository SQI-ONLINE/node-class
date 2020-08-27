const Customer = require('../models/customer.model')

const getCustomers = (req, res)=>{
    Customer.find((err, result)=>{
        console.log(result);
        // res.send
    })
}

module.exports.getCustomers = getCustomers;

const getCustomerDetail = (req, res)=>{
    let email = req.params.email;
    console.log(email);
    Customer.findOne({email}, (err, result)=>{
        console.log(result)
    })
}

module.exports.getCustomerDetail = getCustomerDetail;

const saveNewCustomer = (req, res) => {
    let n_customer = {  
        first_name: 'Taiwo', 
        last_name: 'Abidakun', 
        email: 'atomty1@gmail.com', 
        phone: '08108209224', 
        address: 'Akure'
    };

    newCustomer = new Customer(n_customer);
    newCustomer.save();
}

const updateCustomer = (req, res) => {
    let email = 'atomty1@gmail.com';
    let customer = {  
        first_name: 'David', 
        last_name: 'Ridwan', 
        email: 'atomty1@gmail.com', 
        phone: '08108209224', 
        address: 'Akure'
    };

    Customer.updateOne({email}, customer, (err, result)=>{
        
    })
}

module.exports.saveNewCustomer = saveNewCustomer;