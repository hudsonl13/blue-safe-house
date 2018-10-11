// Set additional environment variables
require("dotenv").config();

const express = require("express");

const app = express();

app.set("view engine" , "ejs");
app.use(express.static(__dirname + "/public"));

// Set routes
app.get("/" , function(req , res)
{
    res.render("index");
});

app.listen(process.env.PORT || 8080 , function()
{
    console.log("Server started.");
});
