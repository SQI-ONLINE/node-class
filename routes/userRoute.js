const express = require('express');
const dbController = require('../controllers/db.controller');
const passport = require('passport');

const app = express();
const router = express.Router();

router.post('/signin', (req, res, next) => {
    console.log("REACHING ROUTE")
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        // failureFlash: false 
    })(req, res, next);
});

module.exports = router;
