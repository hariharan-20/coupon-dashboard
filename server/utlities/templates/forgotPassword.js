const forgotPassword = (arg) => {
    const {name,token}=arg;
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

                click on this <a href="http://admin.verzeo.com/reset/${token}"> link </a> to reset password</h5>
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
  
  module.exports = { forgotPassword};