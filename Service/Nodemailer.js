const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

// Generate a 6-digit OTP
const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'notifymepaul@gmail.com',
    pass: process.env. PASSWORD, // Use an app-specific password for better security
  },
});

const senderMailService = (senderMail,recieverMail,first_name,)=>{
    const mailOptions={
  from: 'senderMail',
  to: 'recieverMail',
  subject: 'Your OTP Code',
  text: `Your OTP code is: ${otp}`,
    }


transporter.sendMail(mailOptions, (error, data) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', data.response);
  }
}); 
}
