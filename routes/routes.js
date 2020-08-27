const express = require('express');
const weatherController = require('../controllers/weatherController');

const app = express();
const router = express.Router();

router.post('/process', weatherController.process);


module.exports = router;
