// Middleware for handling auth
const express = require("express")
const app = express()
const { Admin } = require("../db")
async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    try {
        const admin = await Admin.findOne({
            username,
            password
        })
        if (admin == null) {
            throw TypeError("Admin hasn't signed up!");
        }
    } catch (err) {
        res.json({msg: "Admin not found!"})
        console.error(err)
        return;
    }
    next();
   
}

module.exports = adminMiddleware;