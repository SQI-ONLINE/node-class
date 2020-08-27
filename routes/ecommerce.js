const express = require('express');
const ecommerceController = require('../controllers/ecommerceController')


const app = express();
const router = express.Router();

router.post('/addCustomer', ecommerceController.addCustomer);


module.exports = router;
