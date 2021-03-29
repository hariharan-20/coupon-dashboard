const express= require('express');

const  {addCoupon} = require("../../../controllers/couponv3/couponv3Controller")

const router = new express.Router();



router.post('/add-a-coupon',addCoupon)

module.exports = router