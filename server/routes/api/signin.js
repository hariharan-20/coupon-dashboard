const express = require('express');

const 
    { 
        forwardAuthenticated, 
        ensureAuthenticated 
    } = require('../../middleware/passportMiddleware')

const 
    {
        login,
        logout,
    } = require('../../controllers/userController')

const router = express.Router()



//Login Route 
router.post('/login', forwardAuthenticated, login)



//Logout Route
router.get('/logout', ensureAuthenticated, logout)



module.exports = router;