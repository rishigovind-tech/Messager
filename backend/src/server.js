const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {app,server}=require("./config/socket")

const path=require("path")

dotenv.config();


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT;
const __dirname=path.resolve();

if(process.env.NOBE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
