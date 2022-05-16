import express from "express"
import { response } from "express";
import homeController from "../Controller/homeController";

let router = express.Router();

let initWebRountes = (app) => {
    router.get("/", (req, res) => {
        homeController.getHomePage(req, res)
    });

    router.get("/hello", (req, res) => {
        return res.send("loi roi kia");
    })

    return app.use("/", router);
}

module.exports = initWebRountes