const express = require('express');
const storeContoller = require('../controllers/store.controller')


const app = express();
const router = express.Router();

router.get('/getCustomers', storeContoller.getCustomers);
router.get('/getCustomerDetail/:email', storeContoller.getCustomerDetail);
router.post('/saveNewCustomer', storeContoller.saveNewCustomer);


module.exports = router;
