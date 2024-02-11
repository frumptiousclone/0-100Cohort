const jwt = require("jsonwebtoken");
const jwtPassword = 'secret';
async function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;  
    try {
        console.log(token)
        const status = await jwt.verify(token, jwtPassword);
    } catch (err) {
        res.send('Admin not found!')
        console.log(err)
        return;
    }
    next();
}

module.exports = adminMiddleware;