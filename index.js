const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
// const bot = require("./utils/bot");

require("dotenv").config();

const app = express();
const { PORT = 3010, MONGO_URI} = process.env;

app.use(fileUpload({}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "client", "public", "images")));
app.use(cors());

app.use("/api", require("./routes/index"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log("Сервер был успешно запущен"));
    } catch (e) {
        console.log("ERROR! " + e);
    }
};

start();