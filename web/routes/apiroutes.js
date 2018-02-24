var express = require("express");
var connection = require("../../lib/db");
var pgp = require("pg-promise")();
var router = express.Router();

var db = pgp(connection);

// API Routes
router.route("/commands/:command").get(function(req, res) {
  var reqCommand = req.params.command;
  console.log(reqCommand);
  db
    .one("SELECT * FROM public.commands WHERE command = $1", reqCommand)
    .then(commandData => {
      console.log(commandData);
      res.json(commandData);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
