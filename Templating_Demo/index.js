const express = require("express");
const app = express();
const path = require("path"); // to use wiews from outside the current working directory
const redditData = require("./data.json");

// i will tell my app to use EJS -- npm i ejs
app.set("view engine", "ejs"); // we are setting view engine to ejs like key value pair
app.set("views", path.join(__dirname, "/views")); // __dirname refers to directory name where the index.js file is located

app.get("/", (req, res) => {
  res.render("home.ejs"); // res.rendr to to take the home file in views
});

app.get("/random", (req, res) => {
  const randnum = Math.floor(Math.random() * 10) + 1;
  res.render("random.ejs", { randnum: randnum }); // res.rendr to to take the home file in views
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.get("/cats", (req, res) => {
  const cats = ["blue", "rocket", "monty", "winston"];
  res.render("cats", { cats: cats });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
