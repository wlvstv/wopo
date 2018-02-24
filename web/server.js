// Dependencies
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  pgp = require("pg-promise")();

// Routes
var webRoutes = require("./routes/webroutes");
var apiRoutes = require("./routes/apiroutes");

// Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/views"));

// db config
var connection = {
  user: "wopo",
  host: "wlvsdb.cy36wqif1j5l.us-east-1.rds.amazonaws.com",
  database: "wlvs",
  password: "I'mgoingbacktobed",
  port: 5432
};
var db = pgp(connection);

// register routes
app.use("/", webRoutes);
app.use("/wopo/api", apiRoutes);

// Start the web server
var port = 3000 || process.env.PORT;
app.listen(port, function() {
  console.log("Server started on port " + port);
});
