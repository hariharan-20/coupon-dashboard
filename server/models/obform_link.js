var mongoose = require('mongoose')


const obform = mongoose.Schema({
    paymentlinkname: String,
    preamount: Number,
    totalamount: Number,
    paymentlink: String,
    programname: String,
    programtype: String,
    status: Boolean,
    partialpayment: Number,
    fullpayment: Number,
    createdBy: String,
    createdOn: String,
})

module.exports = mongoose.model('obformLink', obform, 'obformLink')