const crypto= require('crypto')


//function to generate token from crypto module
function generateCrytoToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, async(err, buffer)=> {
        if (err) {
          reject();
        }
        const token = buffer.toString("hex");
        resolve(token);
      });
    });
  }



module.exports={generateCrytoToken}