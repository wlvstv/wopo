var express = require("express");
var connection = require("../../lib/db");
var pgp = require("pg-promise")();
var router = express.Router();

var db = pgp(connection);

// API Routes
//#region commands/update/:command Route
router
  .route("/commands/update/:command")
  .get(function(req, res) {
    var reqCommand = req.params.command;
    console.log(reqCommand);
    db
      .one("SELECT * FROM public.commands WHERE command = $1", reqCommand)
      .then(commandData => {
        // console.log(commandData);
        res.json(commandData);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .post((req, res) => {
    var changeCommand = req.params.command;
    var updates = req.body;
    console.log(
      `Update command: ${changeCommand} with ${JSON.stringify(updates)}`
    );
    db
      .one(
        "UPDATE public.commands SET command = $1, response = $2 WHERE command = $3",
        [updates.newCommand, updates.newResponse, changeCommand]
      )
      .then(() => {
        res.redirect("/wopo");
      })
      .catch(error => {
        console.log(error);
      });

    console.log(`Updated command ${changeCommand}`);
  });

//#endregion

//#region /commands/new routes
router.route("/commands/new").post((req, res) => {
  var newCommand = req.body;
  db
    .none(
      "INSERT INTO public.commands(command, isMod, response, creator, channel) VALUES ($1, $2, $3, $4, $5)",
      [
        newCommand.command,
        newCommand.isMod,
        newCommand.response,
        newCommand.creator,
        newCommand.channel
      ]
    )
    .then(() => {
      res.redirect("/wopo");
    })
    .catch(error => {
      console.log(`There was an error: ${error}`);
    });
});
//#endregion

//#region delete route
router.route("/delete/:command").delete((req, res) => {
  var command = req.params.command;
  console.log(`Command to be deleted: ${command}`);
  db
    .any("DELETE FROM public.commands WHERE command = $1", command)
    .then((data) => {
      res.json(data);
    })
    .catch(error => {
      console.log(`There was an err: ${error}`);
    });
});
//#endregion

module.exports = router;
