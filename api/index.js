//requires
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");

//instances
const app = express();

//express Config
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

//express routes
app.use("/api1", require("./routes/templates.js"));
app.use("/api1", require("./routes/devices.js"));
app.use("/api1", require("./routes/users.js"));

module.exports = app;

//Listener
app.listen(3001, () => {
  console.log("API server  Listener en port 3001");
});

//Mongo Connection
const mongoUserName = "devuser";
const mongoPassword = "devpassword";
const mongoHost = "192.168.100.207";
const mongoPort = "27017";
const mongoDatabase = "iotDataBase";

var uri =
  "mongodb://" +
  mongoUserName +
  ":" +
  mongoPassword +
  "@" +
  mongoHost +
  ":" +
  mongoPort +
  "/" +
  mongoDatabase;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  authSource: "admin",
};
try {
  mongoose.connect(uri, options).then(
    () => {
      console.log("\n");
      console.log("*******************************".green);
      console.log("✔ Mongo Successfully Connected!".green);
      console.log("*******************************".green);
      console.log("\n");
    },
    (err) => {
      console.log("\n");
      console.log("*******************************".red);
      console.log("    Mongo Connection Failed    ".red);
      console.log("*******************************".red);
      console.log("\n");
      console.log(err);
    }
  );
} catch (error) {
  console.log("ERROR CONNECTING MONGO ");
  console.log(error);
}

//endpoint test
//En archivos por separado
