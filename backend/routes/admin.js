const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} = require("../db");
const {all} = require("express/lib/application");
const router = Router();
const jwt = require("jsonwebtoken")
const {globalSecret} = require("../config")
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    // if user already exist or not
    Admin.findOne({
        username: username
    })
        .then((data)=>{
            if (data){
                res.status(403).json(" Admin already exist")
            } else{
                Admin.create({
                    username: username,
                    password: password
                })
                    .then((value)=>{
                        const token = jwt.sign({username},globalSecret)
                        res.json(token)
                    })
                    .catch((err)=>{
                        res.status(403).json("Something Went wrong "+err )
                    })
            }
        })
});
router.post('/signin',(req,res)=>{
    const {username, password}= req.headers;
    Admin.findOne({
        username,
        password
    })
        .then((value)=>{
            if(value){
                const token = jwt.sign({username},globalSecret);
                res.json(token)
            } else{
                res.status(403).json("login not successful")
            }
        })
})

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const {title, description,price,imagelink}= req.body;
    Course.create({
        title,
        description,
        price,
        imagelink
    })
        .then((value)=>{
            res.json("Course created successfully")
        })
        .catch((err)=>{
            res.status(403).json("Unsuccessful")
        })

});


router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
     Course.find({})
        .then((allCourse)=>{
            res.json({
                courses: allCourse
            })
        })
});

module.exports = router;