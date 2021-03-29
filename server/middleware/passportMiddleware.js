module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(403).json({
        error:{
            message:"Access is denied. You don't have permission!"
        }
    })
  },
  
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
   res.status(403).json({
       error:{
           message:"You're already login"
       }
   })
  },

  superAdminAuthenticate: function (req,res,next){
    if (req.isAuthenticated()) {

      if(req.user.userType==='super_admin'){
        return next();
      }
     
    }

    res.status(403).json({
        error:{
            message:"Access is denied. You don't have permission!"
        }
    })
  },

  couponAuthenticatedEmp: function (req, res, next) {
    
    if (req.isAuthenticated()) {

      const access= ['business_development', 'operation', 'super_admin', 'admin']
      if(access.indexOf(req.user.userType)>-1){
        return next();
      }
     
    }

    res.status(403).json({
        error:{
            message:"Access is denied. You don't have permission!"
        }
    })
  },
};
