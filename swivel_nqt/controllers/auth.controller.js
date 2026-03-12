const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
    const { fullName, dob, email, mobile, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = "student"; // static role

        User.createUser(
            [fullName, dob, email, mobile, hashedPassword, role],
            err => {
                if (err) {
                    return res.status(500).json({ message: "User already exists" });
                }
                res.json({ message: "Signup successful" });
            }
        );
    } catch {
        res.status(500).json({ message: "Signup failed" });
    }
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    

    User.findUserByEmail(email, async (err, result) => {
        
        if (err || result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            role: user.role,
            email: user.email,
            full_name: user.full_name
        });
    });
};


exports.logout = (req, res) => {
    // No session / JWT → frontend handles logout
    res.json({ message: "Logged out successfully" });
};