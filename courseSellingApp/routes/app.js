const express = require("express")
const app = express();
const userMiddleware = require("../middilewaresWithJwt.js/user");
const adminMiddleware = require("../middilewaresWithJwt.js/admin");
const { Admin } = require("../db");
const { User } = require("../db");
const { Course } = require("../db");
const zod = require("zod");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtPassword = 'secret';

// Admin Routes
const schema = zod.object({
    username: zod.string(),
    password: zod.string()
});

app.use(bodyparser.json());

function payloadDecoder(token) {
    const payload = jwt.decode(token);
    return payload;
}

function signupValidator (req, res, next) {
   const input = {
     username: req.body.username,
     password: req.body.password
    }
    const status = schema.safeParse(input);
    if (!status.success) {
        res.json({msg: "Please enter valid username and password!"})
        return;
    }
    next();
}

app.post('/admin/signup', signupValidator, (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username}, jwtPassword);

    const admin = new Admin({
        username: username,
        password: password
    })
    .save()
    .then(() => res.json({
    message: 'Admin created successfully',
    token
}))
    .catch(err => res.send('Something is wrong with the database!'))
});

app.post('/admin/createCourses',adminMiddleware , async (req, res) => {
    // course creation logic
    const payload = payloadDecoder(req.headers.authorization);
    const publishedBy = payload.username;
    //course information
    const courseTitle = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink
    const courseId = Math.floor(Math.random() * 20) + 1;

    const course = await new Course({
        publishedBy,
        courseTitle,
        courseId,
        description,
        price,
        published: true,
        imageLink
    }).save()
    await Admin.updateOne({username: publishedBy}, {$push: {publishedCourses: course}})
    res.send("Course added successfully!")
});

app.get('/admin/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
   try { 
    const courses = await Course.find({}) 
    res.json({
        courses
    })
} catch (err) {
    if (err) {
        res.send("something is up with the server!")
    }
}});

app.get('/courses/publishedCourses', adminMiddleware, async (req, res) => {
    const payload = payloadDecoder(req.headers.authorization);
    const username = payload.username;
    try{
        const admin = await Admin.findOne({username})
        res.json({courses: admin.publishedCourses})
    } catch (err) {
        if (err) {
            res.json({msg: 'Error!'})
        }
    }
});

// user routes

app.post('/user/signup', signupValidator, (req, res) => {
    // user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({username}, jwtPassword);
    const user = new User({
        username,
        password
    })
    .save()
    .then(() => res.json({ 
        msg: "User created successfully!",
        token
}
    ))
    .catch(err => res.send('Something is up with the server!'));
});

app.get('/user/courses',userMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({})
        res.json({
            courses
        })
    } catch (err) {
        res.send("something is up with the database!")
        console.error(err)
    }
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // course purchase logic
    const payload = payloadDecoder(req.headers.authorization);
    const username = payload.username;
    const courseId = parseInt(req.params.courseId);
    try {
        const purchasedCourse = await Course.findOne({courseId: courseId});
        if (purchasedCourse == null) {
            res.send("Course not found!")
            return;
        }
        await User.updateOne({username}, {$push: {purchasedCourses: purchasedCourse}});
        res.json({msg: `Purchase successfull!`})
    } catch (err) {
        res.json({msg: 'Error!'})
    }
});

app.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // fetching purchased courses logic
    const payload = payloadDecoder(req.headers.authorization);
    const username = payload.username;
    try {
        const user = await User.findOne({username})
        res.json({courses: user.purchasedCourses})
    } catch (err) {
        if (err) {
            res.json({msg: 'Error!'})
        }
    }
});

app.use((err, req, res, next) => {
    res.send("Internal server error!");
    console.error(err);
})

app.listen(5000, (req, res) => console.log('live!'))

