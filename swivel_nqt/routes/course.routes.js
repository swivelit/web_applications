const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller.js");

router.get("/all", courseController.getAllCourses);
router.get("/check/:email", courseController.checkEnrollment);
router.post("/enroll", courseController.enrollCourse);

module.exports = router;
