var express = require("express");
require("dotenv").config();
require("./db");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const participantsRouter = require("./routes/participants");
const activitiesRouter = require("./routes/activities");
const authRouter = require("./routes/auth");
const eventsRouter = require("./routes/events");
const roleRouter = require("./routes/roles");
const mobileRouter = require("./routes/mobile");
const inscriptionsRouter = require("./routes/inscriptions");
const qrCodeRouter = require("./routes/qrCode");
const stripeRouter = require("./routes/stripe");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/participants", participantsRouter);
app.use("/activities", activitiesRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/roles", roleRouter);
app.use("/mobile", mobileRouter);
app.use("/inscriptions", inscriptionsRouter);
app.use("/qrcode", qrCodeRouter);
app.use("/stripe/charge", cors(), stripeRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
