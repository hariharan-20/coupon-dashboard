const newCoupon = (arg) => {
    const {name,couponCode,discount,couponPurpose}=arg;
    const {greaterThan}=arg.validFor[0];
    const {forCourse}=arg.validFor[1];
    const {forEmail}=arg.validFor[2];
    const {forProgram}=arg.validFor[3];

    if(!name){
        name='';
    }

    return `
      <!DOCTYPE html>
     <html>
     
         <head>
             <title></title>
         </head>
     
             <body >
                Hello ${name},
                <br>
                <br>

                <strong> Greetings from Verzeo! </strong>
                <br>
                <br>

                Coupon code:- <strong> ${couponCode} </strong> generated successfully.  
                <br>
                <br>
                Following are the conditions:-
                <br>
                <br>
                Coupon Purpose:- ${couponPurpose}
                <br>
                Discount:- ${discount}
                <br>
                Valid For Email ID:- ${forEmail}
                <br>
                Price:- ${greaterThan}
                <br>
                Program:- ${forProgram}
                <br>
                Course:- ${forCourse}
                <br>



                <br>
                <br>
                   <div> Regards,
                       <br>
                       Verzeo Team 
                   </div>
             </body>
     
       </html>
      `;
  };
  
  module.exports = { newCoupon};