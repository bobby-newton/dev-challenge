"use strict";
const fetch = require("node-fetch");

const appRouter = app => {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome!");
  });

  app.get("/users", (req, res) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => res.status(200).send(data));
  });
};

module.exports = appRouter;
