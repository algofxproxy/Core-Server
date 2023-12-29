const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  CheckEmail,
  InsertNewUser,
  matchPassword,
  GetUserById,
} = require("../controllers/user.controller");

function initialize(passport) {
  async function authenticateUser(email, password, done) {
    try {
      // CHECKING IF USEREMAIL IF NULL
      const user = await CheckEmail(email);
      if (!user) {
        return done(null, false, { message: "Invalid User!"});
      }
    //   console.log(user);
      // CHECKING IF USER PASSWORD IF NULL
      const passwordMatch = await matchPassword(password, user.password);
      if (!passwordMatch)
        return done(null, false, { message: "Wrong Password!" });
      // PASSED CHECKING
      return done(null, { id: user.id, username: user.username });
    } catch (error) {
      return done(error, false);
    }
  }

  passport.use(
    "auth-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => {
    // console.log("the user"+user)
    done(null, user.id);
  });

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user
  passport.deserializeUser(async (id, done) => {
    // GETS USER BY ID AND DESERIALIZES ITS ATTRIBUTES SO YOU CAN ACCESS IT BY USER.WHATEVER
    let user = await GetUserById(id);
    return done(null, user);
  });
}

module.exports = initialize;
