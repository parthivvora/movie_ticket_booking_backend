const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const adminModel = require("../models/admin.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
          return done(null, false);
        }
        const isPasswordValid = password == admin.password;
        if (!isPasswordValid) {
          return done(null, false);
        } else {
          const user = {
            id: admin.id,
            email: admin.email,
            isAdmin: admin.isAdmin, // Set isAdmin property
          };
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const admin = await adminModel.findOne({ _id: id });
    done(null, admin);
  } catch (error) {
    done(error);
  }
});
