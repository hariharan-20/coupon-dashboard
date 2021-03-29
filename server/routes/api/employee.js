const express= require('express');

const 
    {
        ensureAuthenticated,
        superAdminAuthenticate
    } = require('../../middleware/passportMiddleware');

const 
    {
        addUser,
        newPassword,
        forgotPasswordToken,
        getAllUsers,
        getSingleUser,
        changeUserStatus,
        updateUser,
        deleteUser,
        generateUserFromCSV,
        checkingAuthentication
    } = require('../../controllers/userController')

const upload = require('../../utlities/multer')
const { multerErrorHandling } = require('../../utlities/multerErrorHandler')    

const router = new express.Router();

/*
    Employees Access = ['admin','business_development, 'hr', 'technical', 'operation', 'super_admin]
*/

/*
    Route to check authentication (Access- employees)
*/
router.get('/isAuthenticated',ensureAuthenticated, checkingAuthentication) 



/*
    Route to add a user (Access- Only for super_admin)
*/
router.post('/add-a-user', superAdminAuthenticate, addUser)



/*
    Route to generate user from CSV file (Access- Only for super_admin)
*/
router.post('/csv-to-user', superAdminAuthenticate, upload.single("csvfile"), multerErrorHandling, generateUserFromCSV)



/*
    Route to change the password using the token send through mail (Access- Free)
*/
router.post('/new-password', newPassword)



/*
    Forgot Password Route to generate a token send to their Email ID (Access- Free)
*/
router.post('/forgot-password', forgotPasswordToken)



/*
    Route to view all the Employees (Access- Only for super_admin & admin)
*/
router.get('/view-all-users', ensureAuthenticated, getAllUsers)



/*
    Route to view single Employee details (Access-  super_admin and admin can see all the users details
                                                    other employees can see their details)
*/
router.get('/view-single-user/:id', ensureAuthenticated, getSingleUser)



/*
    Route to activate or deactivate an employee account (Access- Only for super_admin)
*/
router.post('/change-user-status/:id', superAdminAuthenticate, changeUserStatus)



/*
    Route to update an employee details (Access- Only for super_admin)
*/
router.post('/update-single-user/:id', superAdminAuthenticate, updateUser)



/*
    Route to delete an employee (Access- Only for super_admin)
*/
router.delete('/delete-a-user/:id', superAdminAuthenticate, deleteUser)



module.exports = router