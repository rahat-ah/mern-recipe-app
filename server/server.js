const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
const userRouter = require("./router/auth-route")
const recipeRouter = require("./router/recipe-router")
const userdataRouter = require("./router/userdata-route")

app.use(cors(
  {
  origin: ["http://localhost:5173"],  
  methods: ["GET", "POST","PUT"],
  credentials: true,   
}
));
app.use(express.json())
app.use(cookieParser())
app.use('/auth/',userRouter)
app.use('/recipe/',recipeRouter)
app.use('/user/',userdataRouter)

mongoose.connect("mongodb://localhost:27017/recipeApp")

app.get("/", (req, res) => {
  res.send("hi, hello");
});

const start = () => {
  try {
    app.listen(3000, () => {
      console.log("server started at port 3000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

start()