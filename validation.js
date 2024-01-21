const express = require("express")
const app = express()
const zod = require("zod")
const schema = zod.number()
app.use(express.json())

function inputValidator(req, res, next){
    const input = req.query.n
    const response = schema.safeParse(input)
    next()
}

app.get("/", inputValidator, (req, res) => {
    if (response.success == false) {
        res.status(403).send(response.error.issues[0].message)
        return;
    }
    res.send(response)
})
app.listen(2000, (req,res) => {
    console.log("Listening")
})
app.use((errr,req, res,  next ) => {
    res.status(403).send(
         "Invalid input"
    )
})