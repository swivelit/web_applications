const db = require("../config/db");

exports.getAll = callback => {
    db.query("SELECT * FROM courses ORDER BY created_at DESC", callback);
};

exports.checkEnrollment = (email, callback) => {
    const sql = `
        SELECT sc.*, c.course_name, c.gmeet_link
        FROM student_courses sc
        JOIN courses c ON sc.course_id = c.id
        WHERE sc.user_email = ?
        LIMIT 1
    `;
    db.query(sql, [email], callback);
};

exports.enroll = (email, courseId, callback) => {
    const sql = `
        INSERT INTO student_courses (user_email, course_id)
        VALUES (?, ?)
    `;
    db.query(sql, [email, courseId], callback);
};
