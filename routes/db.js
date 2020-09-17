const express = require('express');
const dbController = require('../controllers/db.controller');

const app = express();
const router = express.Router();

router.get('/users', dbController.getUsers);
router.post('/addUser', dbController.addUser);

module.exports = router;
