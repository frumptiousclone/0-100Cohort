const { User } = require("../db")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.header.username;
    const password = req.header.password;
    try {
        const user = User.findOne({
            username,
            password
        }) 
        if (user == null) {
            throw TypeError("User hasn't signed up!")
        }
    } catch (err) {
        res.json({msg: "User not found!"})
        console.error(err)
        return;
    }
        next();
   
}

module.exports = userMiddleware;