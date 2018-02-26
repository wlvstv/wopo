var express = require("express");
var connection = require("../../lib/db");
var pgp = require("pg-promise")();
var router = express.Router();

db = pgp(connection);

// Webpage routes
router.get("/wopo", function(req, res) {
  db
    .any("SELECT * FROM public.commands")
    .then(commands => {
      res.render("index", { commands: commands });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
