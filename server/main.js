const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require('passport')



const app = express();



//  const 
//      {
//         jobDeactivateStringExpiryCoupon
//       jobDeactivateExpiryCoupon,
//       updatingExpiryDatetoDate
//     }=require('./utlities/cron')


/*
    ######################################
    Database Connection
    ######################################
*/

  //local database

  // const connectDB = require("./local database/db");
  // connectDB();


  // main db
  
  mongoose.connect("mongodb://verzeoroot:Verzeo12%40%2345@ec2-13-126-117-63.ap-south-1.compute.amazonaws.com/verzeo?authSource=admin&w=1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => {
      console.log("Connected to verzeo database")
  }
).catch(error => {
  console.log("Error connecting to verzeo database")
  console.log(error)
})
  


/*
    ######################################
    Middlewares
    ######################################
*/

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("cors")({
  origin: 'http://admin.verzeo.com',
  credentials: true,
}));

app.use(session({
  secret: 'zdfvjbhklfdgsfzx',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());


/* 
  Passport Local Strategy
*/

require("./utlities/passport")(passport);



/*
    ######################################
    Route
    ######################################
*/
app.use('', require("./routes/apiRoutes"))
//app.use('/v3/coupon',require("./routes/api/couponV3/couponV3"))



//jobDeactivateExpiryCoupon.start();
//jobDeactivateStringExpiryCoupon.start();



/*
  Listening the app on PORT 9897 in development mode 
*/
const port=process.env.PORT || 9897;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
