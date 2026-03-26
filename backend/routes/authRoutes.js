const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();


// test route
router.get("/test", (req, res) => {
    res.send("Auth route working");
});


// signup
router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists){

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.json({

            message: "Signup successful",
            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Error creating user"

        });

    }

});


module.exports = router;

// login
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        res.json({

            message: "Login successful",

            user

        });

    } catch (error) {

        res.status(500).json({

            message: "Login error"

        });

    }

});