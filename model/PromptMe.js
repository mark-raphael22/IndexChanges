const mongoose=require('mongoose');
const  Schema = mongoose.Schema;


const ProductSchema=new Schema({
    FirstName:{
        type: String,
        trim:true,
        maxlength:[20,"please username cannot exceed 20 characters"],
        required:[true,'please enter firstname']
    },
    LastName:{
        type: String,
        required:[true,'please enter lastname'],
        maxlength:[20,"please username cannot exceed 20 characters"],
     
    },

    products:{
            type: String,
            required:[true,'please enter product'],
    },
    // PhoneNumber:{ 
    //     required: [true,'please enter a  phone  number'],      
    //     type: Number, 

    // },

    expiryDate:{
        type: Date,
            startdate:new Date(),
            expirationDate: new Date('2024-2-31'),
           
    },

    // createdBy:{
    //     type:mongoose.Types.ObjectId,
    //     ref:'user',
    //     required:[true,'please provide a user']
    // }

    

},{timestamps:true});



ProductSchema.method.hasExpired= function() {
    const currentDate = new Date();
    if (currentDate > expiryDate) {
      console.log('The product has expired.');
    } else {
      console.log('The product is still valid.');
    }
}



module.exports =mongoose.model('product',ProductSchema);