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
  origin: ["https://recipe-app-frontend-bogd.onrender.com"],  
  methods: ["GET", "POST","PUT"],
  credentials: true,   
}
));
app.use(express.json())
app.use(cookieParser())
app.use('/auth/',userRouter)
app.use('/recipe/',recipeRouter)
app.use('/user/',userdataRouter)

mongoose.connect("mongodb+srv://rahatahmedbosscomputer_recipe_project:myMongoRecipeApp@cluster0.jtm2nf1.mongodb.net/recipeapp?appName=Cluster0")

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