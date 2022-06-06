import express from "express"
import { response } from "express";
import homeController from "../Controller/homeController";
import userController from "../Controller/userController";

let router = express.Router();

let initWebRountes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrud);
    router.post("/post-crud", homeController.postCrud);
    router.get("/get-crud", homeController.displayGetCrud);
    router.get("/edit-crud", homeController.editCrud);
    router.post("/put-crud", homeController.putCrud);
    router.get("/delete-crud", homeController.deleteCrud);

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
    router.put("/api/edit-user", userController.handleEditUser);

    return app.use("/", router);
}

module.exports = initWebRountes