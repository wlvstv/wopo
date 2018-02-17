// Dependencies
var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser');

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
app.get("/", function(req, res) {
    res.render("index");
});


// Start the web server
var port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log("Server started on port " + port)
})