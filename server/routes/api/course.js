const express= require('express');
const 
    {
        superAdminAuthenticate
    } = require('../../middleware/passportMiddleware');

const 
    {
        addCourse,
        getAllCourse,
        getCourseWithProgram,
        getPlanForCourse,
        changeCourseStatus,
        deleteCourse
    } = require('../../controllers/courseController')


const router = new express.Router();



/*
    Route to add a course (Access- Only for super_admin )  
*/
router.post('/add-a-course', superAdminAuthenticate, addCourse)



/*
    Route to get all the courses (Access- Free)
*/
router.get('/get-all-course', getAllCourse)



/*
    Route to get all course according to program name (Access- Free)
*/
router.get('/get-all-course_name/:id', getCourseWithProgram)



/*
    Route to get all the plans for a course (Access- Free)
*/
router.get('/get-course-plan/:id', getPlanForCourse)



/*
    Route to activate or deactivate a single coupon (Access- Only for super_admin)
*/
router.post('/change-course-status/:id', superAdminAuthenticate, changeCourseStatus)



/*
    Route to delete a course (Access- Only for super_admin)
*/
router.delete('/delete-a-course/:id', superAdminAuthenticate, deleteCourse)



module.exports = router