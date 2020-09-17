const Users = require('../db/models').Users;
const { Op} = require('sequelize');

const getUsers = (req, res) => {
    Users.findAll({attributes: ['firstName', ['lastName', 'last']]})
    Users.findAll({where: {email: "whatever"}})
    // Users.findAll({where: [Op.and]: {email: "email1", email: "email2"}})
}

const addUser = (req, res) => {
    // console.log("Reaching get users");
    // res.send("Reaching get users");
    let new_user = {firstName: "Favour", lastName: "Favour", email: "favour@gmail.com"};
    return Users.create(new_user).then(user => { res.send("User Created")}).catch(err => console.log(err))
}

module.exports = { getUsers, addUser }