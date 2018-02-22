// Dependencies
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  pgp = require("pg-promise")();

// Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/lib/public"));

// db config
var connection = {
  user: "wopo",
  host: "wlvsdb.cy36wqif1j5l.us-east-1.rds.amazonaws.com",
  database: "wlvs",
  password: "I'mgoingbacktobed",
  port: 5432
};
var db = pgp(connection);

// Webpage routes
app.get("/wopo", function(req, res) {
  db
    .any("SELECT * FROM public.commands")
    .then(commands => {
      res.render("index", { commands: commands });
    })
    .catch(err => {
      console.log(err);
    });
});

// API Routes
var router = express.Router();

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

// register routes
app.use("/wopo/api", router);

// Start the web server
var port = 3000 || process.env.PORT;
app.listen(port, function() {
  console.log("Server started on port " + port);
});
