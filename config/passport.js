const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users.model')
module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    console.log("REACHING HERE 2")
      console.log(password);
      User.findOne({ email: email }).then(user => {
        if (err) { return done(err); }
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
  
        if(user.password !== password){
          return done(null, false, { message: 'Incorrect password.' });
        }
      //   if (!user.validPassword(password)) {
      //     return done(null, false, { message: 'Incorrect password.' });
      //   }
        return done(null, user);
      }).catch(err => console.log(err));
    }
    ));
    
    passport.serializeUser(function(user, done) {
        console.log(user, "SERIALIZING")
        done(null, user.id);
    });
    // passport.serializeUser(User.serializeUser());
    // passport.deserializeUser(User.deserializeUser());
      
    passport.deserializeUser(function(user, done) {
      console.log(user, "DESERIALIZING")
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}