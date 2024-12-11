require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate OTP
exports.generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP via email
exports.sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS, // Gmail app password
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw error;
    }
};

