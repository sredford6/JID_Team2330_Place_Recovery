import express from "express";
import mongoose from "mongoose";
const app = express();
import authRoute from "routes/auth";
import authObj from "config/auth.json";

const port = 2400;
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

async function startServer() {
  app.listen(port, () => {
    console.log(`Server started: ${port}`);
  });
}

startServer();
