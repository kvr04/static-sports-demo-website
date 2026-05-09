const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/send-email", async (req, res) => {

    const {
        name,
        age,
        weight,
        sport,
        timing
    } = req.body;

    try {

        const transporter =
        nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.EMAIL,

            subject: "New Sports Registration",

            text: `
New Registration

Name: ${name}
Age: ${age}
Weight: ${weight}
Sport: ${sport}
Timing: ${timing}
            `
        });

        res.send("Form Submitted Successfully");

    } catch (error) {

        console.log(error);

        res.send("Error Sending Email");
    }
});

app.listen(3000, () => {

    console.log("Server Running on Port 3000");
});