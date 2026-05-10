const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const OpenAI =
require("openai").OpenAI;

dotenv.config();

/* =========================
   OPENAI
========================= */

const openai =
new OpenAI({

    apiKey:
    process.env.OPENAI_API_KEY
});

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
/* =========================
   AI CHATBOT
========================= */

app.post("/chat", async (req, res) => {

    try{

        const {
            message
        } = req.body;

        const completion =
        await openai.chat.completions.create({

            model:"gpt-4.1-mini",

            messages:[

                {
                    role:"system",

                    content:`
You are an AI Sports Coach.

You explain:
- sports rules
- techniques
- health
- exercises
- foods to eat
- foods to avoid
- sports training

Give short professional answers.
                    `
                },

                {
                    role:"user",

                    content:message
                }
            ]
        });

        res.json({

            reply:
            completion
            .choices[0]
            .message
            .content
        });

    }catch(error){

        console.log(error);

        res.json({

            reply:
            "AI is currently unavailable."
        });
    }
});

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );
});