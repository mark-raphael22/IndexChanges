const Details=require('../model/PromptMe')


const allDetail= async(req, res)=>{
   const {FirstName, LastName,PhoneNumber,product ,expiryDate} = req.body;
   if(!FirstName,LastName,PhoneNumber,product){
    return res.status(400).json({success:false,mesage:'please provide the valid information'});
   }
   try {
        const detail=await  Details.find({createdBy: req.user.userId });
        
        res.status(200).json({success:true , noOfstories: detail.length,data:detail}); 

   } catch (error) {
    res.json({error}) 
    console.log(error); 
   } 
}  
const getSinglDetail=async(req,res)=>{
   const {detailId}=req.params
   try {
    const detail = await Details.findOne({  createdBy: req.user.userId , _id:detailId});
    if (!detailId) {
        // return next(new ErrorHandlller('product not found',404));
        return res
          .status(404)
          .json({
            success: false, 
            message: `custumer detail with the ${detailId} was not found`,

        


          });
      }
      res.status(201).json({success: true,detail});
   } catch (error) {
    console.log(error);
   }
   
} 


const createDetail = async(req, res)=>{
    const {FirstName, LastName,PhoneNumber,product, expiryDate} = req.body;
    if(!FirstName,LastName,PhoneNumber,product ){
        req.body.createdBy = req.user.userId;
     return res.status(400).json({success:false,mesage:'please provide the valid information'});
    }
    try {
        const detail=await Details.create(req.body);

        res.status(200).json({success:true,message:'created successfully', detail})
    } catch (error) {
        console.log(error);
    }

 

}
const updateDetail= async(req,res)=>{
    const {detailId}=req.params;
    const {FirstName, LastName,PhoneNumber,product} = req.body;
    if(!FirstName,LastName,PhoneNumber,product){
     return res.status(400).json({success:false,mesage:'please provide the valid information'});
    }
    try {
        const detail = await Details.findOneAndUpdate(
            { createdBy: req.user.userId, _id:detailId },
            req.body,
            { new: true, runValidators: true }
          );
          res
            .status(200)
            .json({ success: true, message: " custumer detail has been updated", detail});
    } catch (error) {
        console.log(error);
    }
}

const DeleteDetail= async(req,res)=>{
    const {detailId}=req.params;
        try {
            const detail = await Story.findByIdAndDelete({
                createdBy: req.user.userId,
                _id: detailId,
              });
              if (!detail) {
                return res
                  .status(401)
                  .json({
                    success: false,
                    message: `detail with id ${detailId} was not found so can't be deleted `,
                  });
              }
              res.status(201).json({ message: "story deleted successfully" });
        } catch (error) {
           console.log(error); 
        }
    
}


module.exports={
    allDetail,
    createDetail,
    getSinglDetail,
    updateDetail,
    DeleteDetail,

}