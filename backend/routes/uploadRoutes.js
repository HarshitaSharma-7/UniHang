const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/profile", upload.single("image"), async (req, res) => {

  try {

    if(!req.file){

      return res.status(400).json({

        message: "No file uploaded"

      });

    }

    const result = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(

        { folder: "profile_images" },

        (error, result) => {

          if (error) reject(error);

          else resolve(result);

        }

      );

      stream.end(req.file.buffer);

    });


    const updatedUser = await User.findByIdAndUpdate(

      req.body.userId,

      { profilePic: result.secure_url },

      { new: true }

    );


    res.json(updatedUser);

  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    res.status(500).json({

      message: "Upload failed"

    });

  }

});

module.exports = router;