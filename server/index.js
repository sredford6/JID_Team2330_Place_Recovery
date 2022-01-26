const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./auth.json");

const dbURI = auth.mongodb.uri;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: auth.mongodb.db,
  user: auth.mongodb.user,
  pass: auth.mongodb.pass,
};
app.use(express.json());

mongoose.connect(dbURI, dbOptions);
const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("DB started successfully");
  console.log(`DB name: ${db.name}`);
});

app.listen(2400, () => {
  console.log("Server started: 2400");
});
