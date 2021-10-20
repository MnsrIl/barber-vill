const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const TelegramAPI = require("node-telegram-bot-api");

require("dotenv").config();

const { PORT = 3010, MONGO_URI, NODE_ENV, BOT_TOKEN } = process.env;
const app = express();


const bot = new TelegramAPI(BOT_TOKEN, {polling: true});
module.exports.MIO = bot;

app.use(fileUpload({}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "client", NODE_ENV === "production" ? "build" : "public")));

app.use("/api", require("./routes/index"));

if (NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log("Сервер был успешно запущен"));
  } catch (e) {
    console.log("ERROR! " + e);
  }
};

start();
