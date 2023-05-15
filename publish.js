var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqttHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
//mqttClient.connect();

// Routes
app.post("/send-mqtt", function(req, res) {
    mqttClient.publish(req.body.message);
    res.status(200).send("Message sent to mqtt");
});

var server = app.listen(8000, function() {
    console.log("app running on Rest api port.", server.address().port);
});