const mongoose = require('mongoose')

const coupon = mongoose.Schema({
    couponCode: String,
    couponPurpose: String,
    byDiscountPerc: Boolean,
    discount_perc: Number,
    discount_money: Number,
    discountLimit: Boolean,
    maxDiscount: Number,
    startingDate: String,
    expireByDate: Boolean,
    dateOfExpiry: String,
    isLimited: Boolean,
    limitedTo: Number,
    validFor: Array,
    couponStatus: Boolean,
    createdBy: String,
    createdOn: Date,
})


module.exports = mongoose.model('coupons', coupon, 'coupons')




// const options = {
//         couponCode: 'anmol',
//         couponPurpose: 'testing Coupon',
//         couponDescription: 'ghjdfkghdkfj sfkjhdskj',
//         byDiscountPerc: false,
//         discount_perc: 30,
//         discount_money: 3000,
//         discountLimit: false,
//         maxDiscount: 1000,
//         startingDate: "9/6/2019",
//         expireByDate: false,
//         dateOfExpiry: "10/4/2020",
//         isLimited: false,
//         limitedTo: 5,
//         validFor: [
//           [
//             'greaterThan', 2500,
//           ],
//           [
//             'lesserThan', 4000,
//           ],
//           [
//             'equalTo', 3000,
//           ],
//           [
//             'forCourse', 'machineintern'
//           ],
//           [
//             'forEmail', 'anmolagarwal@verzeo.in'
//           ]
//         ],
//         createdOn: new Date().toLocaleDateString(),
//         createdBy: 'anmolagarwal@verzeo.in',
//         // employeeId: 'V008',
//         modifiedBy: [
//           [
//             'prateek@verzeo.in', '06/09/2020', 'What change happened?'
//           ],
//           [
//             'prateek@verzeo.in', '06/09/2020', 'What change happened?'
//           ],
//         ],
//         couponStatus: true,
//       }