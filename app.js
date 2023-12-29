require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rateLimiter = require("express-rate-limit");
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const passport = require("passport");
const initializePassport = require("./config/passport.config");
initializePassport(passport);
const session = require("express-session");
const flash = require("express-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/proxy_server");
const storeRouter = require("./routes/store");

// CONFIGS
const db = require("./config/db.config");
db.connect();

const app = express();
const corsOptions = {
  origin: [
    process.env.CLIENT_WEBAPP_URL,
    process.env.ADMIN_WEBAPP_URL,
    process.env.CLIENT_WEBAPP_ACCOUNT_URL,
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  session({
    // cookie: {ephemeral: true},
    // cookieName: "session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/servers", productsRouter);
app.use("/store", storeRouter);

module.exports = app;
