const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const consign = require("consign");
const compression = require("compression");
const expressValidator = require("express-validator");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(helmet());
app.use(compression());

consign()
  .include("app/controllers")
  .then("app/models")
  .then("config/dbConnection.js")
  .into(app);

module.exports = app;
