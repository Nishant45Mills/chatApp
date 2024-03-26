const express = require("express");
const app = express();
const authRoute = require("./auth.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
];

routes.forEach((data) => {
  app.use(data.path, data.route);
});

module.exports = app;
