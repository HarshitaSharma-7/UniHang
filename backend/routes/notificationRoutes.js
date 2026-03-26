const Notification = require("../models/Notification");
const express = require("express");
const router = express.Router();


// get notifications for user

router.get("/:userId", async (req, res) => {

  try {

    const notifications = await Notification.find({

      userId: req.params.userId

    }).sort({ createdAt: -1 });

    res.json(notifications);

  }

  catch (error) {

    res.status(500).json({

      message: "Error fetching notifications"

    });

  }

});


// mark notification as read

router.post("/read/:id", async (req, res) => {

  try {

    await Notification.findByIdAndUpdate(

      req.params.id,

      { isRead: true }

    );

    res.json({

      message: "Updated"

    });

  }

  catch (error) {

    res.status(500).json({

      message: "Error"

    });

  }

});

module.exports = router;