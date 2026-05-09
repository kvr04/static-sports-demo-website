const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(express.static("public"));

app.use(express.json());

/* =========================
   EMAIL ROUTE
========================= */

app.post("/send-email", async (req, res) => {

    const {
        name,
        age,
        weight,
        sport,
        timing
    } = req.body;

    try {

        /* =========================
           TRANSPORTER
        ========================= */

        const transporter =
        nodemailer.createTransport({

            host: "smtp.gmail.com",

            port: 587,

            secure: false,

            auth: {

                user: process.env.EMAIL,

                pass: process.env.PASSWORD
            },

            tls: {
                rejectUnauthorized: false
            }
        });

        /* =========================
           VERIFY CONNECTION
        ========================= */

        transporter.verify((error, success) => {

            if(error){

                console.log(
                    "SMTP ERROR:",
                    error
                );

            }else{

                console.log(
                    "Email Server Ready"
                );
            }
        });

        /* =========================
           SEND EMAIL
        ========================= */

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.EMAIL,

            subject: "New Sports Registration",

            html: `

            <h2>
                New Sports Registration
            </h2>

            <hr>

            <p>
                <b>Name:</b>
                ${name}
            </p>

            <p>
                <b>Age:</b>
                ${age}
            </p>

            <p>
                <b>Weight:</b>
                ${weight}
            </p>

            <p>
                <b>Sport:</b>
                ${sport}
            </p>

            <p>
                <b>Preferred Timing:</b>
                ${timing}
            </p>

            `
        });

        console.log(
            "Email Sent Successfully"
        );

        res.status(200).send(
            "Form Submitted Successfully"
        );

    } catch (error) {

        console.log(
            "EMAIL ERROR:",
            error
        );

        res.status(500).send(
            "Error Sending Email"
        );
    }
});

/* =========================
   HOME ROUTE
========================= */

app.get("/", (req, res) => {

    res.sendFile(
        __dirname + "/public/index.html"
    );
});

/* =========================
   SERVER
========================= */

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );
});