const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose')
const User=require('../model/User')


        
const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raphaelpaul347@gmail.com',
        pass:'raphaelpaul1234'
    }

})

const sendConFiirmationEmail= async (req, res,) => {
    try {
   

        const mailOptions = {
            from: req.user.email,
            to: req.body.user.email, // Assuming email is passed in the request body
            subject: 'Confirm Your Email',
            text: `Click the following link to confirm your email: ${confirmationLink}`
        };
        
        
        //sending mail to the user accoount

            // Send the confirmation email


            // transporter.sendMail(mailOptions, (erro r, info) => {
            //     if (error) {
            //         console.error('Error sending email:', error);
            //         res.status(500).json({msg:'Error sending email'});
            //     } else {
            //         console.log('Email sent:', info.response);   
            //       return  res.status(200).json({msg:'Email sent successfully'});
            //     }
            // });

            //or
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        }
         
    catch (error) {
        console.log('error sending mail: ', error);
    }
}

    
const userEmail = req.user.email
await sendConFiirmationEmail(userEmail);


 
// const StartServer= async (req,res)=>{
//     try {
//         await mongoose.connect(process.env.MON_URI) 
        
//     } catch (error) {
//         console.log(error);
//     }
  
// }
// StartServer();