import express from "express"
import { response } from "express";
import homeController from "../Controller/homeController";

let router = express.Router();

let initWebRountes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrud);
    router.post("/post-crud", homeController.postCrud);
    router.get("/get-crud", homeController.displayGetCrud);

    return app.use("/", router);
}

module.exports = initWebRountes