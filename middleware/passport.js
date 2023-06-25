require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const foundUser = await foundUser.findOne({ username });
    if (!foundUser) {
      return done(null, false);
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
      return done(null, false);
    }
    return done(null, foundUser);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (tokenPayload, done) => {
    if (Date.now > tokenPayload.exp * 1000) {
      return done(null, false);
    }
    try {
      const user = await User.findById(tokenPayload._id);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
