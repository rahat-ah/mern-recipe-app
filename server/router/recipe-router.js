const express = require("express");
const recipeModel = require("../models/recipe");
const userModel = require("../models/user");
const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", (req, res) => {
  console.log(req.body);
  recipeModel.create({
    name: req.body.recipeName,
    description: req.body.description,
    ingerdients: req.body.ingredients,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
  });
  return res.json({ message: "recipe saved" });
});

recipeRouter.get("/all-recipe", async (req, res) => {
  try {
    const allRecipe = await recipeModel.find();
    const creatorsId = allRecipe.map((data) => data.userId);
    const creatorsData = await Promise.all(
      creatorsId.map(async (creatorId) => {
        return await userModel.findById(creatorId);
      })
    );
    return res.json({ allRecipe, creatorsData });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

recipeRouter.get("/read-recipe/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fullRecipe = await recipeModel.findById(id);
    console.log(fullRecipe.userId);
    const creatorData = await userModel.findById(fullRecipe.userId);
    return res.status(200).json({ fullRecipe, creatorData });
  } catch (err) {
    return res.status(500).json({ message: "an error happen", err });
  }
});

recipeRouter.put("/save-recipe", async (req, res) => {
  const { recipeId, userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    user.savedRecipeId.push(recipeId);
    await user.save();
    return res.json({ message: "recipe saved!" });
  } catch (error) {
    return res.status(500).json({ message: "there was an error", error });
  }
});

recipeRouter.get("/saved-recipe/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const savedRecipe = [];
    const userData = await userModel.findById(id);
    for (const recipeId of userData.savedRecipeId) {
      const recipeData = await recipeModel.findById(recipeId);
      savedRecipe.push(recipeData);
    }
    res.json(savedRecipe)
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = recipeRouter;
