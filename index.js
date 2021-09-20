const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { PORT = 3500, MONGO_URI} = process.env;

app.use(fileUpload({}));
app.use(express.json());
app.use(cors());

app.use(require("./routes/index"));

const runServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log("Сервер был успешно запущен"));
    } catch (e) {
        console.log("ERROR! " + e);
    }
};

runServer();