"use strict";
const fetch = require("node-fetch");
const path = require("path");

const appRouter = app => {

  app.get("/", function(req, res) {
    res.status(200).sendFile("index.html");
  });

};

module.exports = appRouter;
