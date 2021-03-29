const fs = require("fs");
const Readable = require("stream").Readable;



const passport = require('passport')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const csv = require("csv-parser");
const validator = require('validator');



const Employee = require('../models/employee')
const { sendEmail } = require('../utlities/sendEmail');
const { generateCrytoToken } = require('../utlities/generateToken')    



//function to convert buffer to stream
function bufferToStream(buffer) {
        var stream = new Readable();
        stream.push(buffer);
        stream.push(null);      
        return stream;
}



//Login
const login = async (req, res, next) => {
    
    try{
        let { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                error: {
                    message: 'Fill up all the details!'
                }
            })
        }
     
        passport.authenticate("local", (err, user, info) => {
    
            if (err) { throw err };
            if (!user) {
                return res.status(404).json({
                    error: {
                        message: info.message
                    }
                })
            }
            else {
                req.logIn(user, err => {
                    if (err) throw err;
                    const userDetails = {
                        userType: user.userType,
                        email: user.email,
                        name: user.name
                    }
                    res.status(200).send({ msg: 'Successfully Authenticated!', userDetails })
                })
            }
    
        })
            (req, res, next);

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something Went Wrong!'
            }
        })
    }
  
}



//Logout
const logout = async (req, res) => {
    try {
        req.logout();
        res.status(200).send({ msg: 'Signout was successful!' })
    } catch (e) {
        res.status(500).json({
            error: {
                message: 'Something went wrong!'
            }
        })
    }
}



// Adding a user
const addUser = async(req,res)=>{
    try{
        let { forEmail, forUserType, name }=req.body
        const { email }=req.user

        if(!forEmail  || !forUserType || !name ){
            return res.status(400).json({
                error:{
                    message:'Please fill out all the fields!'
                }
            })
        }
       
        if(!(validator.isEmail(forEmail))){
            return res.status(400).json({
                error:{
                    message:'Enter the correct email id!'
                }
            })
            
        }

        const employee= await Employee.findOne({
            email:forEmail
        })

        if(employee){
            return res.status(400).json({
                error:{
                    message:'Email Already Taken!'
                }
            })
        }
           
        const payload ={  
            name:name,
            email:forEmail,
            userType:forUserType,
            account_status:true,
            createdBy:email,
            isAccountVerified:false,
          };
         
          
        crypto.randomBytes(32,async(err,buffer)=>{
            if(err){
                throw new Error('Something went wrong. Try again!');
            }
            const token = buffer.toString("hex")
            payload.resetToken = token
            payload.expireToken = Date.now() + 86400000
            const newEmployee= await Employee.create(payload);   

            const arg={
                to:newEmployee.email,
                subject:'Create Account Password - Verzeo',
                template:'newUser',
                name:newEmployee.name,
                token:token
            }
            sendEmail(arg)  

            res.status(201).send({msg:'Created User Successfully. A mail had been sent to the user email.'})
   
            })
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something Went Wrong!'
            }
        })

    }
}



// Creating new Password
const newPassword = async(req,res)=>{
    try{
        let {password, token} = req.body
        if(!password){
            res.status(400).json({
                error:{
                    message:'Please fill out all the fields!'
                }
            })
        }

        const employee= await Employee.findOne({resetToken:token,expireToken:{$gt:Date.now()}})
        if(!employee){
            return res.status(440).json({
                error:{
                    message:'Session got expired. Kindly request on forgot password'
                }
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async(err, hash) => {
              if (err) throw err;
              const user=await Employee.findOneAndUpdate({email:employee.email},{password:hash,resetToken:"",expireToken:null, isAccountVerified:true},{
                new: true
              })
              res.status(200).send({msg:'Updated Password Successfully'})
            });
          });

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something Went Wrong. Try Again!'
            }
        })
 
    }
}



// Sending token when user forget password
const forgotPasswordToken = async(req,res)=>{
    try{
        let {email}=req.body;
        if(!email){
            res.status(400).json({
                error:{
                    message:'Please fill the email!'
                }
            })
        }

        const employee= await Employee.findOne({
            email:email
        })
        if(!employee){
            return res.status(404).json({
                error:{
                    message:'User Not Found!'
                }
            })
        }   
        crypto.randomBytes(32,async(err,buffer)=>{
            if(err){
                throw new Error('Something went wrong. Try again!');
            }
            const token = buffer.toString("hex")
            const expireToken = Date.now() + 3600000
            const newEmployee= await Employee.findOneAndUpdate({email:email},{resetToken:token,expireToken:expireToken});  
         
            const arg={
                to:newEmployee.email,
                subject:'Password Reset - Verzeo',
                template:'forgotPassword',
                name:newEmployee.name,
                token:token
            }
            
            sendEmail(arg) 
            res.status(200).send({msg:'A mail has been sent to your Email ID. Kindly change your password'})
        })

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something Went Wrong!'
            }
        })

    }
}



// Getting all the users details
const getAllUsers = async(req,res)=>{
    try{
        const {userType,email}=req.user

        if(!email || !userType){
            throw new Error('Something went wrong. Try again!');
        }
        if(userType!=='super_admin' && userType!=='admin'){

            return res.status(400).json({
                error:{
                    message:"Access is denied. You don't have permission!"
                }
            })
        }
        const allUser= await Employee.find({}).select(["-password", "-resetToken", "-expireToken"]);
        if (!allUser || allUser.length<1){
            return res.status(404).json({
                error:{
                    message:'User not found!'
                }
            })
        }
        res.status(200).send({allUser})
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })
    }
}



// Getting single user details
const getSingleUser = async(req,res)=>{
    try{
        const {userType,email}=req.user
        const {id}=req.params;
        if(!email || !userType){
            throw new Error('Something went wrong. Try again!');
        }
        if(!id){
            res.status(400).json({
                error:{
                    message:'Invald id!'
                }
            })     
        }
        let user;
        if(userType==='admin' || userType==='super_admin'){
            user=await Employee.findOne({
                _id:id
            }).select("-password")
        }
        else{
            user=await Employee.findOne({
                _id:id,
                email:email
            }).select(["-password", "-resetToken", "-expireToken"])
        }
        if(!user){
            return res.staus(404).json({
                error:{
                    message:'User not found!'
                }
            })
        }
        
        res.status(200).send({user})
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })
    }
}



// Changing user status activate/deactivate
const changeUserStatus = async(req,res)=>{
  
    try{
        const {id}=req.params;

        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid User ID'
                }
            })                 
        }
        const employee= await Employee.findOne({
            _id:id
        })
        if(!employee){
            return res.status(404).json({
                error:{
                    message:'User not found!'
                }
            })       
        }
        let status=false;
        if(!employee.account_status){
            status=true;
        }
        const updateEmployee = await Employee.findOneAndUpdate({_id:id}, {account_status:status}, {
            new: true
          });
        res.status(200).send({
            status:updateEmployee.account_status
        })

    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })       

    }

}



// Updating a user details
const updateUser = async(req,res)=>{
  
    try{
        const {id}=req.params;

        let {forUserType,forEmail,name}=req.body

        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid User ID'
                }
            })                 
        }   
        
               
        if(!forEmail  || !forUserType || !name ){
            return res.status(400).json({
                error:{
                    message:'Please fill out all the fields!'
                }
            })
        }
     
        if(!(validator.isEmail(forEmail))){
            return res.status(400).json({
                error:{
                    message:'Enter the correct email id!'
                }
            })
            
        }
   
        const employee= await Employee.findOne({
            _id:id
        })
        if(!employee){
            return res.status(404).json({
                error:{
                    message:'User not found!'
                }
            })       
        }
        if(employee.email===forEmail && employee.userType===forUserType && employee.name===name){
            return res.status(400).json({
                error:{
                    message:'Sorry! Please change any field to update.'
                }
            })
        }

        if(employee.email!==forEmail){
            const alreadyEmailUser= await Employee.findOne({email:forEmail});
            if(alreadyEmailUser){
                return res.status(400).json({
                    error:{
                        message:'Email Already Exist!'
                    }
                })
            }

        }
        
        const updateDetails={
            name:name,
            email:forEmail,
            userType:forUserType
    
        }
        const employeeDetails=await Employee.findOneAndUpdate({_id:id},updateDetails,{
            new: true
          }).select(["-password", "-resetToken", "-expireToken"])
          delete employeeDetails.password;
        res.status(200).send({msg:'User updated successfully!',employeeDetails}); 


    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })  
    }
}



// Deleting a user
const deleteUser = async(req,res)=>{
   
    try{
        const {id}=req.params;

        if(!id){
            return res.status(400).json({
                error:{
                    message:'Invalid User ID'
                }
            })                 
        }

        await Employee.deleteOne({
            _id:id
        })
        res.status(200).send({msg:'User Successfully Deleted!'})
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        })       
    }
}



//checking current user authentication and return usertype if authenticated user
const checkingAuthentication=async(req,res)=>{
    
    res.status(200).json({
        userType:req.user.userType,
        msg:'Authenticated'
    })
}



//getting user payload or error from csv file
const getUserDataFromCSV =async (user, creator, serial_no)=>{
    if(!user.forEmail && !user.forUserType && !user.name){
        return {empty:'empty data'};
    }

    if(!user.forEmail  || !user.forUserType || !user.name ){
        return {error:`ForEmail, ForUserType, name are mandatory fields in line no ${serial_no} of CSV file.`}
    }

    user.forEmail=user.forEmail.trim().toLowerCase();
    user.name=user.name.trim();
    user.forUserType=user.forUserType.trim().toLowerCase();

    if(!validator.isEmail(user.forEmail)){
        return {error:`${user.forEmail} is not valid email in line no ${serial_no} of CSV file`}
    }

    const userType=['business_development','operation','hr','technical','admin','super_admin'];

    if(userType.indexOf(user.forUserType) < 0){
        return {error:`Choose userType - business_development, operation, hr, technical, admin, super_admin `}
    }

    const alreadyUser= await Employee.findOne({email:user.forEmail});
    if(alreadyUser){
        return {error:`Account for ${user.forEmail} already exist in line no ${serial_no} of CSV file.` }
    }

    const payload ={  
        name:user.name,
        email:user.forEmail,
        userType:user.forUserType,
        account_status:true,
        createdBy:creator,
        isAccountVerified:false,
      };

    payload.resetToken= await generateCrytoToken();
    if(!payload.resetToken){
        return {error: `Something Went wrong in line no ${serial_no} of CSV file.`}
    }

    payload.expireToken = Date.now() + 86400000;
    return {success:payload}
    }
    


//generate user from CSV file
const generateUserFromCSV = async (req, res) =>{
    try{
        let readStream = bufferToStream(req.file.buffer);
        let errorArray = [];
        let userArray=[];
        let totalUser=[]
      
        await readStream
          .pipe(csv())
          .on("data", async (row) => {
    
            totalUser.push(row)     
          
          }).on('close',()=>{
            console.log(req.user.email, ' tried to generate users from csv');
           
          })
   

          for(let user=0; user < totalUser.length; user++ ){
             
            let result = await getUserDataFromCSV(totalUser[user], 'req.user.email', user+2);
            
            if (result.success) {
                userArray.push(result.success);
              } else if(result.error) {
                errorArray.push(result.error);
              }
          }

          if (errorArray.length > 0) {
            return res.status(400).json({
              error: {
                message: "fields are wrong. Kindly give proper data",
                errorArray,
              },
            });
          }

          if(userArray.length < 1){
              return res.status(400).json({
                  error:{
                      message: "empty CSV file"
                  }
              })
          }
      
          await Employee.insertMany(userArray);
         
          userArray.forEach(async(user) => {
            let arg = {
                to:user.email,
                subject:'Create Account Password - Verzeo',
                template:'newUser',
                name:user.name,
                token:user.resetToken}
                sendEmail(arg)
              
          });
          
      
          res.status(201).json({
            msg: "Users created successfully!",
          });
    
    }catch(e){
        res.status(500).json({
            error:{
                message:'Something went wrong. Try again!'
            }
        }) 
    }

}



module.exports =
    {
        login,
        logout,
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
    }