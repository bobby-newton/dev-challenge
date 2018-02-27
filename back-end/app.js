const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const port = 3000;

const server = app.listen(port, () => {
  console.log("app running on port", server.address().port);
});
