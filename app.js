const connectDb = require("./database");
const express = require("express");
const app = express();
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

connectDb();
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(
    "The application is running on localhost:",
    process.env.PORT || 8000
  );
});
