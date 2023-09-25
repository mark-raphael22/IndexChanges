require('dotenv').config()
const express = require('express')  
const app = express() ;   
const mongoose= require('mongoose');
const port = process.env.PORT || 5020;
const UserRouter = require('./Route/UserRouter');
const PromptRouter = require('./Route/PromptRoute');
const auth = require('./middleware/Authentication')
const cors = require('cors');



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

//Public Route
app.use('/api/v1',UserRouter) 

//private Route
//private router method
app.use('/api/v1/user/task',auth,PromptRouter,) 
   

 

mongoose.set("strictQuery",true); 
  
const StartServer= async (err)=>{
    try {
        await mongoose.connect(process.env.MON_URI) 
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
        if (err) {
            console.error('MongoDB connection error:', err.message);
            
            // // Customize error message for users
            // const userErrorMessage = 'Unable to connect to the database. Please try again later.';
            if (err.code === 'ECONNREFUSED') {
              console.error('Possible causes: MongoDB server is not running, or the URI is incorrect.');
            }
        }else {
            console.log('Connected to MongoDB');
            // Continue with database operations
          }
    } catch (error) {
        console.log(error);
    }
    
}
StartServer();    