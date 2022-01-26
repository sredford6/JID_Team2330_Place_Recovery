const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/auth");
const authObj = require("./auth.json");

const dbURI = authObj.mongodb.uri;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: authObj.mongodb.db,
  user: authObj.mongodb.user,
  pass: authObj.mongodb.pass,
};

app.use(express.json());
app.use("/api/auth", authRoute);

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
