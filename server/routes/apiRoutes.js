const router = require("express").Router()



/*
    ######################################
    Routes
    ######################################
*/

router.use("/authenticate", require("../routes/api/signin"));
router.use("/coupon", require("../routes/api/coupon"));
router.use("/employee", require("../routes/api/employee"));
router.use("/course", require("../routes/api/course"));

module.exports = router;