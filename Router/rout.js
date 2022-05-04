const express = require("express");
const { register, login } = require("../UserHendler/userHendler");

const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);

module.exports = Router;
