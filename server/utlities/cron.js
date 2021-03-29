const cron = require('node-cron')
const Coupon= require('../models/couponv2')



//CronJob to deactivate the coupon if expiry date is in date format at 00:00:00 IST
// //0 30 15 * * *
const jobDeactivateExpiryCoupon = cron.schedule('0 30 15 * * *', async() =>  {
    try{
       const coupons= await Coupon.updateMany({$and: [{dateOfExpiry:{$lt:Date.now()}},{couponStatus:true}] }, {"$set":{"couponStatus": false}});
       
        console.log(`Expired Coupon got Deactivated by Job`);
        console.log('match- ',coupons.n);
        console.log('modified- ',coupons.nModified)
    }catch(e){
        console.log('Error while deactivating by Job');
    }
  }, {
    scheduled: true
  });



//convert string expriry date to date format  
const updatingExpiryDatetoDate =async()=>{
    const coupons= await Coupon.find({});
    for(let no=0;no<coupons.length;no++){
        console.log(coupons[no].dateOfExpiry);
        let dateformat= new Date (coupons[no].dateOfExpiry);
        console.log(dateformat);
        await Coupon.findOneAndUpdate({_id:coupons[no]._id},{dateOfExpiry:dateformat},{new:true})
    }
    console.log('successfully updated');
}



//CronJob to deactivate the coupon if expiry date is in string format at 00:00:00 IST
const jobDeactivateStringExpiryCoupon = cron.schedule('0 30 15 * * *', async() =>  {
  try{
 
     const coupons= await Coupon.find({$and: [{expireByDate:true},{couponStatus:true}] });


     for(let no=0; no<coupons.length; no++){
       let coupon = coupons[no]
       if(new Date(coupon.dateOfExpiry)!='Invalid Date' && new Date(coupon.dateOfExpiry) <= new Date( new Date().toLocaleDateString())){

         await Coupon.findOneAndUpdate({_id:coupon._id},{couponStatus:false},{new :true})
         console.log(`${coupon.couponCode} deactivated`);
       }
     }
     console.log('Expired Coupon got deactivated by job');

  }catch(e){
      console.log('Error while deactivating by Job');
  }
}, {
  scheduled: true
});



//module.exports ={
 //    jobDeactivateStringExpiryCoupon
//     jobDeactivateExpiryCoupon,
//     updatingExpiryDatetoDate
//};

