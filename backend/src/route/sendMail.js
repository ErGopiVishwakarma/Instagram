const nodeMailer = require('nodemailer')
const express = require('express')
require('dotenv').config()
const emailRouter = express.Router()

const otpArr = []
var timeOut = ''

emailRouter.post('/', async (req, res) => {

    const { email } = req.body
    const user = await UserModel.find({ email })
    if (!user) {
        res.status(400).send({ msg: 'this email does not exist.' })
    } else {
        // generating the otp 
        let otp = Math.floor((Math.random() * 1000000) + 1);
        if (otp.toString().length == 5) {
            otp = +(otp.toString() + 1)
        }

        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.CLIENT_USERNAME,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.CLIENT_REFRESH_TOKEN
            }
        });

        var mailOptions = {
            from: 'g2468vi@gmail.com',
            to: 'gopi271vi@gmail.com',
            subject: 'Your One-Time Password (OTP) for Account Verification',
            html: `<p>Dear gopi vishwakarma<br><br>            
                   Your OTP for account verification is: ${otp}. This OTP will be valid for the next 2 minutes.<br><br>
                   Best regards,<br>
                   Infotech.</p>
            `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(400).send({ msg: 'something went wrong.' })
            } else {
                otpArr.push(otp)
                setTimeout(() => {
                    const index = otpArr.indexOf(otp)
                    otpArr.splice(index, 1)
                }, 120000)
                res.status(200).send({ msg: 'otp sent successfully please check your email' })
            }
        });
    }
})

emailRouter.post('/verify', async (req, res) => {
    const { otp } = req.body
    if (otpArr.includes(otp)) {
        clearTimeout(timeOut)
        const index = otpArr.indexOf(otp)
        otpArr.splice(index, 1)
        res.status(200).send({ msg: 'otp verified successfully' })
    } else {
        res.status(400).send({ msg: 'invailid otp' })
    }
})

module.exports = emailRouter