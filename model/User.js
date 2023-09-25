const mongoose =require('mongoose')
const  Schema = mongoose.Schema;
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


const UserSchema= new Schema({
    username:{
        type:String,
        trim:true,
        maxlength:[20,"please username cannot exceed 30 characters"],
        required:[true,'please enter a username']
    },
    email:{ 
        type:String,
        required:[true,'please enter a email'],
        unique:true,
         match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"please provide a email"]


    },  

    role:{
        type:String,
         enum:['user','admin',],
        default:'user'
    },

    password:{
        type:String,
        required:[true,'please provide a password'],
        minlenght:[10,'the minimum lenght for password is 10']


    },


},{timestamps:true});


UserSchema.pre('save', async function  (next) {
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.comparePassword =  async function (userpassword) {
    const checked= await bcrypt.compare( userpassword,this.password)
    return checked
}   

UserSchema.methods.generateToken=function (){ 
return jwt.sign({userId:this._id,username:this.username},process.env.JWT_SECRET,{expiresIn:"3d"})
}
 
module.exports = mongoose.model('user',UserSchema);
 