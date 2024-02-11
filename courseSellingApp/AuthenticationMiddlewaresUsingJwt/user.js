const jwt = require("jsonwebtoken");
const jwtPassword = 'secret';
async function userMiddleware(req, res, next) {
    const token = req.headers.authorization;  
    try {
        const status = await jwt.verify(token, jwtPassword);
        console.log(token)
    } catch (err) {
        res.send('User not found!')
        return;
    }
    next();
}

module.exports = userMiddleware;