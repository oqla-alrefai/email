const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    }
});

// API endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { first_name, last_name, email, mobile_no, message } = req.body;

    console.log(email);
    // Email options
    const mailOptions = {
        from: email,
        to: process.env.MY_EMAIL,
        subject: `${first_name} ${last_name} - ${mobile_no}`,
        text: message
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
