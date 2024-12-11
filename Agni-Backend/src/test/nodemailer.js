require('dotenv').config();
const nodemailer = require('nodemailer');

const sendTestEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "Kprajwal95910@gmail.com",
            subject: "Test Email",
            text: "This is a test email from the Nodemailer setup!",
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

sendTestEmail();
