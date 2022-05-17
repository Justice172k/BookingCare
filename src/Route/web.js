import express from "express"
import { response } from "express";
import homeController from "../Controller/homeController";

let router = express.Router();

let initWebRountes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrud);
    router.post("/post-crud", homeController.postCrud);
    router.get("/get-crud", homeController.displayGetCrud);
    router.get("/edit-crud", homeController.editCrud);
    router.post("/put-crud", homeController.putCrud);
    router.get("/delete-crud", homeController.deleteCrud);

    return app.use("/", router);
}

module.exports = initWebRountes