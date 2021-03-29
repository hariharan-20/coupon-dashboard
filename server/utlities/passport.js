const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/employee");



const Passport = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" },(email, password, done) => {

      User.findOne({
        email: email,
      }).then((user) => {
        
        //if email not found
        if (!user) {
          return done(null, false, { message: "Email is not registered" });
        }

        //if account is not verified with email
        if(!user.isAccountVerified){
          return done(null, false, { message: "Your Account is not verified. You must have received an email to create password" });
        }

        //if account status in inactive
        if(!user.account_status){
          return done(null, false, {message: "Contact Super_admin, your account is deactivated!"})
        }

        //comparision of password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(null,false,{message:"Go to the mail and change the password"});
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        });
      });
    })
  );


  //serialization 
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  //deserialization
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};



module.exports = Passport;