

exports.authoRizeRoles = (...roles) => {
  return (req, res, next) => {
    // Making sure that user is an admin
   if (req.user && req.user.role === 'admin') {
      // If admin, proceed to the next middleware
     
      if(!roles.includes(req.user.role)){
        return next (
       
  new Error(`Role (${req.user.role}) is not allowed to access this resource`,res.status(403).json({success:false,}))
    // res.status(403).json({success:false,message:`Role (${req.user.role}) is not allowed to access  this resource`})
    )     
    }

   
    }
    next();
  };
};
