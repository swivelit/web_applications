const Course = require("../models/course.model");

/* =========================
   GET ALL COURSES
========================= */
exports.getAllCourses = (req, res) => {
    Course.getAll((err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching courses" });
        res.json(results);
    });
};

/* =========================
   CHECK IF STUDENT ENROLLED
========================= */
exports.checkEnrollment = (req, res) => {
    const email = req.params.email;

    Course.checkEnrollment(email, (err, result) => {
        if (err) return res.status(500).json({ message: "Error checking enrollment" });
        res.json(result[0] || null);
    });
};

/* =========================
   ENROLL STUDENT
========================= */
exports.enrollCourse = (req, res) => {
    const { email, courseId } = req.body;

    Course.enroll(email, courseId, err => {
        if (err) return res.status(500).json({ message: "Enrollment failed" });
        res.json({ message: "Enrollment successful" });
    });
};
