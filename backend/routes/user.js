const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");
const {globalSecret} = require("../config");
const jwt = require("jsonwebtoken")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username, password } = req.headers;
    User.findOne({
        username
    })
        .then((value)=>{
            if(value){
                res.status(403).json("User already Exist")
            }
            else{
                User.create({
                    username,
                    password
                })
                    .then((value)=>{
                        const token = jwt.sign({username},globalSecret)
                        res.json(token)
                    })
                    .catch((err)=>{
                        res.status(403).json({msg:"User not created"})
                    })
            }
        })
});

router.post('/signin',(req,res)=>{
    const {username, password }= req.headers;
    User.findOne({username, password})
        .then((value)=>{
            if(value){
                const token = jwt.sign({username},globalSecret)
                res.json(token);
            } else{
                res.status(403).json("successful")
            }
        })
})


router.get('/courses', (req, res) => {
    // Implement listing all courses logic
 Course.find()
    .then((allCourse)=>{
        res.json({courses:allCourse})
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    User.updateOne({username},{
        "$push":{
            purchasedCourses:courseId
        }
    })
        .then((c)=>{
            res.json("Purchased succesfully")
        })



});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({
        username:req.username
    })
        .then((data)=>{
            Course.find({
                _id:{
                    "$in":data.purchasedCourses
                }
            }) .then((courses)=>{
                res.json({courses})
            })
        })

});

module.exports = router