const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const Router = require("./Router/rout");

// dot env file
dotenv.config({ path: "config/.env" });

// Database
require("./Database/connect");

const app = express();


// coockies parser
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(Router);
app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(8078, () => {
  console.log("server is running on 8078");
});
