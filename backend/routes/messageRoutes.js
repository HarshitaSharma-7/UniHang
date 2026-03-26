const express = require("express");

const Message = require("../models/Message");

const router = express.Router();


// get old messages
router.get("/:planId", async (req, res) => {

  const messages = await Message.find({

    planId: req.params.planId

  }).sort({ createdAt: 1 });

  res.json(messages);

});

module.exports = router;