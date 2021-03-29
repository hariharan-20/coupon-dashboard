
//error hanndlig for multer module
const multerErrorHandling=(error, req, res, next) => {
    res.status(500).json({error:{
        message:'Something Went wrong. Please upload a csv file'
    } });
  }



module.exports={multerErrorHandling}