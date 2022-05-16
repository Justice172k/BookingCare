import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRountes from "./Route/web"
import connectDB from "./config/connectDB"
require('dotenv').config();

let app = express()

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRountes(app);

connectDB();

// Port == undefined => port = 6969
let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port: " + port);
});