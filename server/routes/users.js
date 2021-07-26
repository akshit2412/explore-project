import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Google from '../models/googlelogin.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import speakeasy from 'speakeasy';
import Temp from '../models/registration.js';
import dotenv from 'dotenv';


dotenv.config();
const router = express.Router();
const jwtsecret = process.env.SECRET;

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.json({ message: "User doesn't exist", code: '404' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect)
            return res.json({ message: "Invalid credentials", code: '400' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, name: existingUser.name, createdAt: existingUser.createdAt }, jwtsecret, { expiresIn: '100d' });
        res.json({ info: { result: { _id: existingUser._id, email: existingUser.email, name: existingUser.name, createdAt: existingUser.createdAt }, token }, code: '200' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong. ' });
    }



})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, createdAt: new Date().toISOString() });

        const token = jwt.sign({ email: result.email, id: result._id, name: result.name, createdAt: result.createdAt }, jwtsecret, { expiresIn: '100d' });

        res.status(201).json({ result: { _id: result._id, email: result.email, name: result.name, createdAt: result.createdAt }, token });


    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

})


router.post('/sendEmail', async (req, res) => {
    const { email } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        const googleUser = await Google.findOne({ email });
        if (existingUser || googleUser) return res.json({ code: '400' });


        const accessToken = await oAuth2Client.getAccessToken();


        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'exploreotp@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        var secret = speakeasy.generateSecret({ length: 20 });

        const hasTried = await Temp.findOne({ email });
        if (!hasTried) {
            await Temp.create({ email: email, otp: secret.base32 });
        }
        else {
            hasTried.otp = secret.base32;
            await hasTried.save();
        }


        var token = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            step: 900,
            window: 0
        });

        const mailOptions = {
            from: '"ExploreApp"<exploreotp@gmail.com>',
            to: email,
            subject: 'Explore Account Verification',
            html: '<h3>OTP for account verification is </h3>' + '<h1>' + token + '</h1>' + '<h3>This OTP is valid only for next 15 mins. <h3/>'
        };

        await transport.sendMail(mailOptions);


        res.json({ error: false, message: 'Email Sent', code: '200' })



    } catch (error) {
        res.status(500).send(error.message);
    }


})

router.post('/forgotEmail', async (req, res) => {
    const { email } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.json({ code: '400' });


        const accessToken = await oAuth2Client.getAccessToken();


        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'exploreotp@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        var secret = speakeasy.generateSecret({ length: 20 });

        const hasTried = await Temp.findOne({ email });
        if (!hasTried) {
            await Temp.create({ email: email, otp: secret.base32 });
        }
        else {
            hasTried.otp = secret.base32;
            await hasTried.save();
        }

        var token = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            step: 900,
            window: 0
        });

        const mailOptions = {
            from: '"ExploreApp"<exploreotp@gmail.com>',
            to: email,
            subject: 'Explore Account Password Change',
            html: '<h3>OTP for password change is </h3>' + '<h2>' + token + '</h2>' + '<h3>This OTP is valid only for next 15 mins. </h3>'
        };

        await transport.sendMail(mailOptions);


        res.json({ error: false, message: 'Email Sent', code: '200' })



    } catch (error) {
        res.status(500).send(error.message);
    }


})

router.post('/verifyOtp', async (req, res) => {

    const { email, otp } = req.body;

    try {
        const user = await Temp.findOne({ email });

        var tokenValidates = speakeasy.totp.verify({
            secret: user.otp,
            encoding: 'base32',
            token: otp,
            step: 900,
            window: 2
        });

        if (tokenValidates)
            res.json({ error: false, message: 'Email Sent', code: '200' })
        else
            res.json({ code: '400' });

    } catch (error) {
        res.status(500).send(error.message);
    }


})


router.post('/googlelogin', async (req, res) => {

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user)
            res.json({ code: '400' });
        else {
            const googleUser = await Google.findOne({ email });
            if (!googleUser) {
                await Google.create({ email: email, createdAt: new Date().toISOString() });
            }
            res.json({ code: '200' });

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.post('/passwordChange', async (req, res) => {
    const { email, oldpassword, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(oldpassword, existingUser.password);

        if (!isPasswordCorrect)
            return res.json({ message: "Invalid credentials", code: '400' });

        const hashedPassword = await bcrypt.hash(password, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        res.json({ error: false, message: 'Password Changed', code: '200' })

    } catch (error) {

    }

})

router.post('/forgotPassword', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 12);
        existingUser.password = hashedPassword;
        await existingUser.save();
        res.json({ error: false, message: 'Password Changed', code: '200' })

    } catch (error) {

    }

})




export default router;

