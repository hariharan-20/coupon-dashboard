const nodemailer= require('nodemailer')
const ejs= require('ejs')



const {newUser}=require('./templates/newUser')
const {forgotPassword}=require('./templates/forgotPassword')
const {newCoupon}=require('./templates/newCoupon')



//getting data according to template
const getData=(arg)=>{
    let data=null;
    switch (arg.template) {
        case "newUser":
            data = newUser(arg);
            break;

        case "forgotPassword":
            data = forgotPassword(arg);
            break;

        case "newCoupon":
            data = newCoupon(arg);
            break;

        default:
            data;
    }
    return data;
}


//transporter for nodemailer
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'noreply@verzeo.in',
        clientId: '908473304175-j3gku1j2h7u9rf78dleh833h4h34dh2m.apps.googleusercontent.com',
        clientSecret: 's-C0h9FwzzvpG9pG3Tj99-hC',
        refreshToken: '1//04U90l7suVRRsCgYIARAAGAQSNwF-L9IrWiYedgZ0JOk1eGZOM99jj5zZTrUn2XNu_dd6DQIdWPZWcyEKYAj5t0qIRMtelC3al7c',
    }
});



//sending email with template
const sendEmail=async(arg)=>{
    try{
        transporter.sendMail({
            to:`${arg.to}`,
            from:`Verzeo Edutech Pvt Ltd <noreply@verzeo.com>`,
            subject:`${arg.subject}`,
            html:getData(arg),
        })
    }catch(e){
        console.log(`Error in sending Mail while ${arg.template}`);
    }

}



//sending email with ejs1
const sendUserEmail= async(arg)=>{
    try{

    const {couponCode,discount}=arg;
    const {forCourse}=arg.validFor[1];
    const {forProgram}=arg.validFor[3];

    ejs.renderFile(__dirname + "/templates/couponToUser.ejs", {couponCode, discount, forCourse,forProgram}, async (err, data) =>{
        
            if(err){
                throw Error('Something Went Wrong');
            }

            var mainOptions = {
                to:`${arg.to}`,
                from:`Verzeo Edutech Pvt Ltd <noreply@verzeo.com>`,
                subject:`${arg.subject}`,
                html: data
            };

             transporter.sendMail(mainOptions, async (err, info) =>{
                if (err) {
                    throw Error('Failed to Send the Mail to User')
                }     
            });
            
        })}catch(e){
               console.log(`Email doesn't send to coupon user`);
            }
}



module.exports = {sendEmail, sendUserEmail};