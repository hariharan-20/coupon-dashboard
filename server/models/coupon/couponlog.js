/*
    Added by : Himanshu Sharma
    Added on : 14 Mar 2021
    Purpose : To save the log of coupons to cross check if needed
*/

const mongoose = require('mongoose')

const couponLog = mongoose.Schema({
    couponid: {
        type: mongoose.Types.ObjectId,
        ref: "coupons",
        require: true,
    },
    useremail: {
        type: String,
        require: true,
    },
    discount: {
        type: String,
        require: true,
    },
    orderid: {
        type: String,
        require: true,
    },
    // Is transaction completed
    // Should be added after capturing payments
    istrancomp: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('coupons', couponLog, 'couponlog')