import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import localtunnel from "localtunnel";
const app = express();
import authRoute from "routes/auth";
import questionRoute from "routes/questionnaire";
import authObj from "config/auth.json";

const port = process.env.PORT || 2400;
const dbURI = authObj.mongodb.uri;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: authObj.mongodb.db,
  user: authObj.mongodb.user,
  pass: authObj.mongodb.pass,
};

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/question", questionRoute);

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

async function setupTunnel() {
  const tunnel = await localtunnel({ port, subdomain: "placenrecovery" });
  console.log(`Tunnel URL: ${tunnel.url}`);
  tunnel.on("close", () => {
    console.log("Tunnel Closed.");
  });
}

startServer();
setupTunnel();
