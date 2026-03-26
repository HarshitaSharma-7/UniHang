const express = require("express");

const Plan = require("../models/Plan");

const cloudinary = require("../config/cloudinary");

const multer = require("multer");

const router = express.Router();

const Notification = require("../models/Notification");


// multer setup
const storage = multer.memoryStorage();

const upload = multer({ storage });


// CREATE PLAN (with image)

router.post("/create", upload.single("image"), async (req, res) => {

  try {

    let imageUrl = "";

    // upload image to cloudinary

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

          { folder: "plans" },

          (error, result) => {

            if (error) reject(error);

            else resolve(result);

          }

        );

        stream.end(req.file.buffer);

      });

      imageUrl = result.secure_url;

    }


    const plan = await Plan.create({

      ...req.body,

      image: imageUrl

    });


    res.json({

      message: "Plan created",

      plan

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error creating plan"

    });

  }

});


// GET ALL PLANS

router.get("/all", async (req, res) => {

  try {

    const plans = await Plan.find()

      .populate("participants", "name profilePic")
      .populate("createdBy","name profilePic")
      

      .sort({ createdAt: -1 });


    res.json(plans);

  }

  catch (error) {

    res.status(500).json({

      message: "Error fetching plans"

    });

  }

});


// JOIN PLAN

router.post("/join/:id", async (req, res) => {

  try {

    const plan = await Plan.findById(req.params.id);

    if (!plan) {

      return res.status(404).json({

        message: "Plan not found"

      });

    }


    const userId = req.body.userId;


    if (plan.participants.includes(userId)) {

      return res.json({

        message: "Already joined"

      });

    }


           plan.participants.push(userId);

            await plan.save();


            // create notification for creator

            if(plan.createdBy.toString() !== userId){

            await Notification.create({

              userId: plan.createdBy,

              message: `Someone joined your plan "${plan.title}"`

            });

            }


    res.json({

      message: "Joined successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: "Error joining plan"

    });

  }

});


// withdraw from plan

router.post("/withdraw/:id", async (req, res) => {

  try {

    const plan = await Plan.findById(req.params.id);

    const userId = req.body.userId;


    plan.participants = plan.participants.filter(

      (p) => p.toString() !== userId

    );


    await plan.save();


    res.json({

      message: "Withdrawn successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      message: "Error withdrawing"

    });

  }

});


// GET SINGLE PLAN

router.get("/:id", async (req, res) => {

  try {

    const plan = await Plan.findById(req.params.id)

      .populate("participants", "name profilePic");


    res.json(plan);

  }

  catch (error) {

    res.status(500).json({

      message: "Error"

    });

  }

});


router.delete("/:id", async (req,res)=>{

try{

await Plan.findByIdAndDelete(req.params.id);

res.json({

message:"Plan deleted"

});

}

catch(error){

res.status(500).json({

message:"Error deleting"

});

}

});


module.exports = router;