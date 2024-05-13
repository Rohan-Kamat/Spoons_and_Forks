import axios from "axios";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const PORT = 3000;
const BASE_URL = "https://api.spoonacular.com/recipes/"
const apiKey = "84cedf6742a24dfeb701608ef7f621f1"

app.use(express.static("public"), bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {stylesheet: "home.css"});
});

app.post("/search", async (req, res) => {
    try {
        var result = await axios.get(BASE_URL + "findByIngredients?ingredients=" + req.body.ingredients + "&ranking=1&number=25&apiKey=" + apiKey);
        res.render("index.ejs", {
            stylesheet: "home.css",
            recipes: result.data
        })
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/recipe/:id", async (req, res) => {
    var recipeId = req.params.id;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    var likes = req.body.likes;
    var image = req.body.image;
    try {
        var result = await axios.get(BASE_URL + recipeId + "/analyzedInstructions?apiKey=" + apiKey);
        res.render("recipe.ejs", {
            stylesheet: "recipe.css",
            title: title,
            ingredients: ingredients,
            likes: likes,
            image: image,
            instructions: result.data[0]
        })
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});