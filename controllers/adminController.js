const { Admin } = require('../models/admin')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')

const sendOTP = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.admin_email }) 
        if (!admin ){
            return res.status(404).json({ status:'error', message: 'wrong admin email entered' })
        }
        const generatedOTP = otpGenerator.generate(6, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false,
        })

        const hashedOTP = await bcrypt.hash(generatedOTP, 10)

        const transporter = nodemailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 2525, // Use the appropriate port here
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.FROM_EMAIL, // Elastic Email account username
                pass: process.env.ELASTIC_EMAIL_API_KEY, // Elastic Email account password or API Key
            },
        })

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'Admin Login OTP',
            text: `Your OTP for login is: ${generatedOTP}`,
        }

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error occurred:', error)
                res.status(500).json({
                    message: 'Failed to send email',
                    error: error.message,
                })
            } else {
                const otpExpiry = new Date(new Date().getTime() + 5 * 60 * 1000)
                //donot delete the commented code below
                //to initialise the admin when doing otp for first time
                // const newAdmin = new Admin({
                //     email: 'teamupcomit@gmail.com',
                //     otp: hashedOTP,
                //     otpCreatedAt: new Date(),
                //     otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
                //     // other admin properties if needed
                //   });
                //   await newAdmin.save();
                //donot delete the commented code above
                await Admin.findOneAndUpdate(
                  { email: process.env.ADMIN_EMAIL }, // Replace with the admin email for whom OTP is generated
                  {
                    otp: hashedOTP,
                    otpCreatedAt: new Date(),
                    otpExpiry,
                  }
                );
                res.status(200).json({ status:'otp',message: 'Email sent successfully' })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}
const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body
        const admin = await Admin.findOne({ email: req.body.admin_email })
        if (!admin ){
            return res.status(404).json({ status:'error', message: 'wrong admin email entered' })
        }

            
        if( !admin.otp || !admin.otpCreatedAt) {
            return res.status(404).json({ status:'expired', message: 'OTP not found or expired' })
        }

        const isExpired = new Date() > admin.otpExpiry
        if (isExpired) {
            return res
                .status(401)
                .json({ message: 'OTP expired, request a new one' })
        }

        const isMatch = await bcrypt.compare(otp, admin.otp)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid OTP' })
        }

        // Clear OTP after successful verification
        await Admin.findOneAndUpdate(
            { email: process.env.ADMIN_EMAIL }, // Replace with the admin email
            { otp: null, otpCreatedAt: null, otpExpiry: null }
        )

        res.status(200).json({ status:'verified',message: 'OTP verified successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

module.exports = { sendOTP, verifyOTP }
