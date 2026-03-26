const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();



// get user notifications

router.get("/:userId", async (req, res) => {

  const notifications = await Notification.find({

    userId: req.params.userId

  }).sort({ createdAt: -1 });

  res.json(notifications);

});


// mark as read

router.post("/read/:id", async (req, res) => {

  await Notification.findByIdAndUpdate(

    req.params.id,

    { isRead: true }

  );

  res.json({ message: "Updated" });

});

module.exports = router;
 

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const planRoutes = require("./routes/planRoutes");
const messageRoutes = require("./routes/messageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notifications", notificationRoutes);


app.get("/", (req, res) => {
    res.send("API WORKING");
});


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));


const server = app.listen(5000, () => {
    console.log("SERVER STARTED");
});


const io = require("socket.io")(server, {

    cors: {
        origin: "*"
    }

});


io.on("connection", (socket) => {

    console.log("User connected");


    socket.on("joinRoom", (planId) => {

        socket.join(planId);

    });


    const Message = require("./models/Message");

        socket.on("sendMessage", async (data) => {

            await Message.create(data);

            io.to(data.planId).emit("receiveMessage", data);

        });

});