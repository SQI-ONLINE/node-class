const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String
})


customerSchema.methods.speak = () => {
    console.log(`My name is ${this.last_name} ${this.first_name}`);
}

customerSchema.pre('save', ()=> {
    console.log(`Saving a new document`)
})

const Customer = mongoose.model('customers',customerSchema);

module.exports = Customer;