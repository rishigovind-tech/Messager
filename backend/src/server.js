const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

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

app.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
});
