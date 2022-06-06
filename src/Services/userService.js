import { reject } from "bcrypt/promises";
import db from "../models/index";
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);



let handleUserLogin = (userEmail, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(userEmail);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: userEmail },
                    raw: true
                })
                console.log(user);
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        // userData.message = 'Ok';
                        console.log(user)
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.message = 'wrong password';
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.message = `User's not found`
                }
            } else {
                userData.errCode = 1;
                userData.message = `Your Email isn't exist in your system. Please try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user)
                resolve(true);

            resolve(false);
        }
        catch (e) {
            reject(e);
        }
    })
}


let compareUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "All") {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                })
            }
            if (userId && userId !== "All") {
                console.log("bbbbb")
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] },
                })
            }
            console.log(users)
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    errMessage: "email exist. Please choose other email"
                })
            }
            else {
                let hashPasswordFromBcrypt = await bcrypt.hashSync(data.password, salt);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender == "1" ? true : false,
                    roleId: data.roleId
                });
                resolve({
                    errCode: 0,
                    message: "Ok"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserDataById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: data,
                }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: user.id }
                });
                resolve({
                    errCode: 0,
                    errMessage: "Delete User Success"
                });
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required parameter`
                })
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: `Update user success`
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `The user isn't exist`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    compareUserPassword: compareUserPassword,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUserDataById: deleteUserDataById,
    updateUserData: updateUserData,
}