const newUser = (arg) => {
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
                
                <div>
                We are all set and excited to welcome you to our Verzeo Family!
                <br>
                Click on this <a href="http://admin.verzeo.com/reset/${token}"> link </a> to create password to access the account.</div>
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
  
  module.exports = { newUser};