const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// const io = require("socket.io")(server);

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("otpVerified", (data) => {
//     io.emit("otpStatus", { userId: data.userId, status: "Verified" });
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

app.use("/api/auth", authRoutes);

module.exports = app;
