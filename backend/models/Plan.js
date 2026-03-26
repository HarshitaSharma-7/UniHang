const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    location: {
        type: String
    },

    dateTime: {
        type: String
    },

    groupType: {
        type: String,
        enum: ["boys", "girls", "anyone"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    image:{
            type:String
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);