const express = require("express");
const app = express(express.json());

app.use(express.json());

const { routerLivre } = require("./app/routes/routerLivre.js")
app.use(routerLivre)

app.listen(8080, () => {
    console.log("Server started");
  });
  