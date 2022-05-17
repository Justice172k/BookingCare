import { json } from "express/lib/response";
import db from "../models/index"
import CRUDservice from "../Services/CRUDservice"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log("++++++++++++++++++++++++");
        console.log(data);
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
    return res.send('post CRUD from server');
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
} 