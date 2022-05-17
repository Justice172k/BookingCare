import { json } from "express/lib/response";
import db from "../models/index"
import CRUDservice from "../Services/CRUDservice"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log("++++++++++++++++++++++++");
        // console.log(data);
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    }
    catch (e) {
        console.log(e);
    };
}

let getCrud = (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    // return res.send('post CRUD from server');
}

let displayGetCrud = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data);
    return res.render("displayCRUD.ejs", { data: data });
}

let editCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        console.log(userData);
        return res.render("editCRUD.ejs", { data: userData })
    }
    else
        return res.send("User not found")
}

let putCrud = async (req, res) => {
    let data = req.body;
    if (data.id) {
        let allUsers = await CRUDservice.updateUserData(data);
        return res.render("displayCRUD.ejs", { data: allUsers });
    }
    else
        return res.send("Not found user");
}

let deleteCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let allUsers = await CRUDservice.deleteUserDataById(userId);
        return res.render("displayCRUD.ejs", { data: allUsers });
        // return res.send("delete succeed");
    }
    else
        return res.send("Not found user");

}


module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displayGetCrud: displayGetCrud,
    editCrud: editCrud,
    putCrud: putCrud,
    deleteCrud: deleteCrud,
} 