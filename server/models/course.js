var mongoose = require("mongoose");


var courseSchema = mongoose.Schema({
    cid: String,
    name: String,
    // price: String,
    clink: String,
    program: String,
    // type:String,
    // plan_type: String,
    page_add: String,   
    plan1:{
        name:String,
        price:String,
    },
    plan2:{
        name:String,
        price:String,
    },
    plan3:{
        name:String,
        price:String,
    },
    status:Boolean,
});



module.exports = mongoose.model("course", courseSchema, "course");








