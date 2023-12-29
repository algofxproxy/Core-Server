const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  CheckEmail,
  CheckUserId,
  InsertNewUser,
} = require("../controllers/user.controller");
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  // console.log(req.body);
  let { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      msg: "All fields are required!",
    });
  } else if (await CheckUserId(username)) {
    return res.status(400).json({
      msg: "Username already exists!",
    });
  } else if (await CheckEmail(email)) {
    return res.status(400).json({
      msg: "Email already exists!",
    });
  } else if (confirmPassword != password) {
    return res.status(400).json({
      msg: "Password does not Match!",
    });
  } else {
    InsertNewUser({ username, email, password });
    res.status(200).json({ msg: "User Registered" });
  }
});

router.post("/login", (req, res, next) => {
  // if you want you can cut the passport authenticate muddleware below and declare it under a function
  // and then pass the function in the router column then you will not have to pass the (res,req,next)
  // because what you did was create a func and called it becaeuse passportjs middleware func are called
  // before express funcs
  passport.authenticate(
    "auth-login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err) {
          // console.log(err, "err");
          return res.status(401).json({ message: err });
        }
        if (user) {
          // console.log(user);
          const payload = { id: user.id, username: user.username };
          jwt.sign(
            { user: payload },
            process.env.SECRET_KEY,
            { expiresIn: 604800 },
            (err, token) => {
              if (err) {
                // console.log(err);
                return res.status(401).json({
                  message: "Failed To Login",
                  errMsg: err,
                  token: null,
                });
              }
              // console.log(token);
              return res.status(200).json({
                token: token,
              });
            }
          );
        }
        if (info) {
          // console.log(info, "info");
          return res.status(401).json(info);
        }
      } catch (err) {
        res.status(500).json({ message: err });
        return next(err);
      }
    }
  )(req, res, next);
});
module.exports = router;
