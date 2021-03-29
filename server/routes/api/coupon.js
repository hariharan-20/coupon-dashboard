const express= require('express');
const 
    { 
        couponAuthenticatedEmp
    } = require("../../middleware/passportMiddleware");

const 
    { 
        addCoupon, 
        addCouponFullFledge,
        addCouponMulti,
        getAllCoupon, 
        getSingleCoupon, 
        changeCouponStatus,
        generateCouponFromCSV,
        updateCoupon,
        updateCouponMulti,
        deleteCoupon,
        coupon2CSV
    } = require("../../controllers/couponController");

    
const upload =require('../../utlities/multer')
const {multerErrorHandling} = require('../../utlities/multerErrorHandler')


const router = new express.Router();

/*
    Coupon Access Employees-  (super_admin, admin, business_development, operation)

*/



/*
    Route to add a single coupon (Access- Coupon Access Employees)
*/
router.post('/add-single-coupon', couponAuthenticatedEmp, addCoupon)



router.post('/add-single-coupon-fullfledge',addCouponFullFledge)



/*
    Route to add a single coupon with multiple conditions (Access- Coupon Access Employees)
*/
router.post('/add-single-coupon-multi', couponAuthenticatedEmp, addCouponMulti)



/*
    Route to view all the coupons (Access- For super_admin and admin shows all the coupons
                                           For other coupon acess employees shows their coupons only)
*/
router.get('/view-all-coupons', couponAuthenticatedEmp, getAllCoupon)



/*
    Route to view a single coupon details (Access- For super_admin and admin can view all the coupons
                                            For other coupon acess employees can view their coupons only)
*/
router.get('/view-single-coupon/:id', couponAuthenticatedEmp, getSingleCoupon)



/*
    Route to activate or deactivate a coupon (Access- super_admin and admin can activate/ deactivate all the coupons
                                                       other coupon acess employees can activate/deactivate their coupons only)
*/
router.post('/change-single-coupon-status/:id', couponAuthenticatedEmp, changeCouponStatus)



/*
    Route to update a single coupon (Access- super_admin and admin can update all the coupons
                                             other coupon acess employees can update their coupons only)
*/
router.post('/update-single-coupon/:id', couponAuthenticatedEmp, updateCoupon)



/*
    Route to update single coupon with multiple conditions (Access- super_admin and admin can update all the coupons
                                                                    other coupon acess employees can update their coupons only)
*/
router.post('/update-single-coupon-multi/:id', couponAuthenticatedEmp, updateCouponMulti)



/*
    Route to delete a single coupon (Access- Only for super_admin)
*/
router.delete('/delete-single-coupon/:id', couponAuthenticatedEmp, deleteCoupon)



/*
    Route to download coupon csv file (Access- super_admin and admin will get all the coupons
                                             other coupon acess employees will get their coupons only)
*/
router.get('/exportCoupon2CSV', couponAuthenticatedEmp, coupon2CSV );



/*
    Route to generate coupons from CSV file (Access- Coupon Access Employees)
*/
router.post('/csv-to-coupon', couponAuthenticatedEmp, upload.single("csvfile"), multerErrorHandling, generateCouponFromCSV)



module.exports = router