const Course= require('../models/course');



// Adding a Course
const addCourse = async(req,res)=>{
    const {name,program,plan1name,plan2name,plan3name,plan1price,plan2price,plan3price,courseId}=req.body;
    try{
        
        if(!courseId || !name || !program || !plan1name || !plan2name || !plan3name || !plan1price || !plan2price || !plan3price ){
            return res.status(400).json({
                error:{
                    message:'Please fill out all the fields!'
                }
            })
        }
       
        const payload={
            cid:courseId,
            name:name,
            program:program,
            plan1:{
                name:plan1name,
                price:plan1price
            },
            plan2:{
                name:plan2name,
                price:plan2price
            },
            plan3:{
                name:plan3name,
                price:plan3price
            },
            status:true
        }
        const course=await Course.create(payload);
        res.status(201).send({msg:'Course Created Successfully!',course})

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })
    }
}



// Getting all the courses details
const getAllCourse = async(req,res)=>{
    try{
        const allCourse=await Course.find({});
       
        if(!allCourse ||allCourse.length<1){
            return res.status(404).json({
                error:{
                    message:'No Course Found!'
                }
            })
        }
        res.status(200).send({allCourse});
}catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })

    }
}



// Getting all the courses according to program
const getCourseWithProgram = async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid Program Name!'
                }
            })
        }
        const allCourse= await Course.find({
            program:id
        })
        if(!allCourse || allCourse.length<1){
            return res.status(404).json({
                error:{
                    message:'No Course Found!'
                }
            })
        }
        res.status(200).send({allCourse})
    }catch(e){
        return res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })
    }
}



// Getting all the plan for a single course
const getPlanForCourse = async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid Course ID!'
                }
            })
        } 
        const course=await Course.findOne({
            _id:id
        })     
        if(!course){
            return res.status(404).json({
                error:{
                    message:'No Course Found!'
                }
            })
        }
        const planArr=[course.plan1,course.plan2,course.plan3]

        res.status(200).send(planArr);
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })
    }

}



//Changing the course status Activate/Deactivate
const changeCourseStatus= async(req,res)=>{
    const {id}=req.params;
    try{
       
        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid Course ID!'
                }
            })                 
        }
        const course= await Course.findOne({
            _id:id
        })
        if(!course){
            return res.status(404).json({
                error:{
                    message:'No Course Found!'
                }
            })       
        }
        let status=false;
        if(!course.status){
            status=true;
        }
        const updateCourse = await Course.findOneAndUpdate({_id:id}, {status:status}, {
            new: true
          });
        res.status(200).send({
            status:updateCourse.status
        })

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })       

    }

}



//Deleting a course
const deleteCourse = async(req,res)=>{
    const {id}=req.params;
    try{
       
        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid Course ID!'
                }
            })                 
        }

        await Course.deleteOne({
            _id:id
        })
        res.status(200).send({msg:'Course Successfully Deleted!'})
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })       
    }
}



module.exports = {
    addCourse,
    getAllCourse,
    getCourseWithProgram,
    getPlanForCourse,
    changeCourseStatus,
    deleteCourse

}
