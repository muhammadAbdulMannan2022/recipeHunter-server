const express = require("express");
const cors = require("cors");
const chefs = require("./data/chefs.json");
const recipes = require("./data/recipes.json");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello ! no data in this root url");
});
app.get("/chefs", (req, res) => {
  res.send(chefs);
});
app.get("/chefs/:id", (req, res) => {
  const id = req.params.id;
  const recipesOfTheChef = recipes.filter(
    (recipe) => recipe.chef_id.toString() === id
  );
  const chefIs = chefs.find((chef) => chef.id.toString() === id);
  if (recipesOfTheChef.length === 0) {
    res.send([[], {}]);
  } else {
    res.send([recipesOfTheChef, chefIs]);
  }
});
app.listen(port, () => {
  console.log("Server listening on port " + port + " !");
});
