
const express = require("express");
const routerLivre = express.Router()

const controllerLivre =
require("../controllers/controllerLivres.js");

// route qui affiche Hello World
routerLivre.get("/", (req, res) => {
    res.json("Api gestion de livres");
  });

routerLivre.get("/livres", (req, res) => {
    controllerLivre.getLivres(req, res)
})

routerLivre.get("/livres/:numlivre", (req, res) => {
    controllerLivre.getLivre(req, res)
})

routerLivre.get("/livres/:numlivre/pages", (req, res) => {
    controllerLivre.getLivrePages(req, res)
})

routerLivre.get("/livres/:numlivre/pages/:numpage", (req, res) => {
    controllerLivre.getLivrePage(req, res)
})

routerLivre.post("/livres", (req, res) => {
    controllerLivre.postLivre(req, res)
})

routerLivre.put("/livres/:numlivre", (req, res) => {
    controllerLivre.putLivre(req, res)
})

routerLivre.delete("/livres/:numlivre", (req, res) => {
    controllerLivre.deleteLivre(req, res)
})
module.exports = { routerLivre };