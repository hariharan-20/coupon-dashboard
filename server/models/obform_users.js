const mongoose = require('mongoose')

const obformUser = mongoose.Schema({
    customer_id: String,
    name: String,
    email: String,
    phone: String,
    isStudent: Boolean,
    college: String,
    branch: String,
    state: String,
    gender: String,
    company_name: String,
    role: String,
    year: String,
    board: String,
    school: String,
    studentclass: String,
    childname: String,

    courseone: String,
    coursetwo: String,
    program: String,
    course_type: String,
    course_start: String,
    program_plan_one: String,
    program_plan_two: String,

    link: String,
    coupon: String,
    discount_amount: String,
    lead_owner: String,
    createdOn: Date,

    pre_fee: String,
    pre_fee_status: Boolean,
    payment_request_id_prefee: String,
    payment_id_prefee: String,
    pre_fee_transaction_date: Date,
    mode_prefee: String,

    pending_fee: String,
    pending_fee_status: Boolean,
    payment_request_id_pending_fee: String,
    payment_id_pending_fee: String,
    pending_fee_transaction_date: Date,
    mode_pending_fee: String,

    ob_filled: Boolean,
    ob_filled_date: Date,

})

module.exports = mongoose.model('obformUser', obformUser, 'obformUser')
