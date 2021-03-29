var mongoose = require('mongoose')


var admin_base = mongoose.Schema({
    name: String,
    email:String,
    phone: String,
    password: String,
    userType: String,
    account_status: Boolean,
    joinedOn: String,
    isAccountVerified:Boolean,
    resetToken:String,
    expireToken:Date,
    createdBy:String,
})

module.exports = mongoose.model('admin_base',admin_base,'admin_base')