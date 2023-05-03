const express = require("express");
const cors = require("cors");
const chefs = require("./data/chefs.json");
const recipes = require("./data/recipes.json");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("This is root ");
});
// for handle get request in /chefs route. it will send chefs data
app.get("/chefs", (req, res) => {
  res.send(chefs);
});
// to this /chefs/chefsid route come with a id and sent data of all recepe that have this id
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
