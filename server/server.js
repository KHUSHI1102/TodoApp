require("dotenv").config(); 
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
