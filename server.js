// Set additional environment variables
require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Set routes
app.get("/" , function(req , res)
{
    res.render("index");
});

app.post("/email" , function(req , res)
{
    let transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com" ,
        port: 465 ,
        secure: true , // True for 465, false for other ports
        auth:
        {
            type: "OAuth2" ,
            user: process.env.GMAIL_USER ,
            clientId: process.env.GMAIL_CLIENT_ID ,
            clientSecret: process.env.GMAIL_CLIENT_SECRET ,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN
        }
    });

    // Setup email data with unicode symbols
    let mailOptions =
    {
        from: "Nodemailer <contact@hudsonlessa.com>" , // Sender address
        to: "contact@hudsonlessa.com" , // List of receivers
        subject: req.body.subject , // Subject line
        text: req.body.message + "\n" + req.body.name + " - " + req.body.emailAddress , // Plain text body
        html: req.body.message + "<br><br><b>" + req.body.name + " - " + req.body.emailAddress + "</b>" // HTML body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions , function(error , info)
    {
        if (error)
            res.redirect("/email-fail");
        else
            res.redirect("/email-success");
    });
});

app.get("/email-success" , function(req , res)
{
    res.render("email-success");
});

app.get("/email-fail" , function(req , res)
{
    res.render("email-fail");
});

// Start web server
app.listen(process.env.PORT || 8080 , function()
{
    console.log("Server started.");
});
