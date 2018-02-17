// Dependencies
var express         = require('express'),
app                 = express(),
bodyParser          = require('body-parser'),
pgp                 = require('pg-promise')();

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/lib/public'));

// db configuration
var connection = {
    user: 'wopo',
    host: 'wlvsdb.cy36wqif1j5l.us-east-1.rds.amazonaws.com',
    database: 'wlvs',
    password: "I'mgoingbacktobed",
    port: 5432
}
var db = pgp(connection);

// Routes
app.get("/", function(req, res) {
    db
        .any('SELECT * FROM public.commands')
        .then(data => {
            res.render("index", {commands: data});
        })
        .catch(error => {

        });    
});

// Start the web server
var port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log("Server started on port " + port)
})