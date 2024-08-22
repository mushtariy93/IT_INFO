const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const port = config.get("port");
const mainRoute = require("./routes/index.routes");

const app = express();
app.use(express.json());

app.use("/api", mainRoute);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(port, () => {
      console.log(`Server started at: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

