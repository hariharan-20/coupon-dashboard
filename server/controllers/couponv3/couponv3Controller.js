const CouponV3 = require('../../models/coupon/couponv3')
/*
 ******** Add Coupon ********
 */

/*
    Add Coupons Functions
*/

// Add Coupon Main Route
const addCoupon = async(req, res) => {

    // Get Data
    let {
        code,
        purpose,
        description,
        validfrom,
        validuntil,
        discounttype,
        discountamount,
        maxdiscount,
        minamount,
        limit,
        usercondition,
        platformconditon,
        condition,
        createdby
    }=req.body
    console.log(req.body);

    // Validate Data





    // Check for any human mistake i.e. check for all the conditions





    // Generate coupon if code is not given
    // Else validate the code 

    // TODO Validate and change if needed
   


    // Save coupon

    let newCoupon = new CouponV3()

    newCoupon.code = code
    newCoupon.purpose = purpose
    newCoupon.description = description
    newCoupon.validfrom = validfrom
    newCoupon.validuntil = validuntil 
    newCoupon.discounttype = discounttype
    newCoupon.discountamount = discountamount
    newCoupon.maxdiscount = maxdiscount
    newCoupon.minamount = minamount
    newCoupon.limit = limit
    newCoupon.usercondition = usercondition
    newCoupon.platformconditon = platformconditon
    newCoupon.createby= createdby
    newCoupon.condition=condition

    console.log("new coupon--------  ",newCoupon);

    


    try {
        await newCoupon.save()
        res.status(201).send({
            msg: 'Coupon Created Successfully!',
        })
    } catch (e) {
        res.status(500).json({
            error:{
                message:"Something Went wrong"
            }
        })

    }




}



/*
 ******** Apply Coupon ********
 */

/*
   Apply Coupons Functions
*/



// Apply Coupon Main Route
const applyCoupon = (req, res) => {

    // Validate Data

    // Conditions Check

}

module.exports = {addCoupon}