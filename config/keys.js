require("dotenv");

module.exports = {
  MONGO_DB_URl:
    "mongodb+srv://maf9894:ciz957qygdJde7a9@cluster0.jwnlkz0.mongodb.net/?retryWrites=true&w=majority",
  PORT: 8000,
  JWT_SECRET: "secret",
  JWT_EXPIRATION_TIME: "5h",
};
