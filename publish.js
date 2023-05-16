/*var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require('./mqttHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
console.log("Step1")
mqttClient.connect();
console.log("Step2")
    // Routes
app.post("/send-mqtt", function(req, res) {
    mqttClient.publish(req.body.message);
    res.status(200).send("Message sent to mqtt");
});

var server = app.listen(8000, function() {
    console.log("app running on Rest api port.", server.address().port);
});

*/
const express = require('express');
const mqtt = require('mqtt');

const app = express();
const port = 3000;

var bodyParser = require("body-parser");

console.log('Trying to connect');
const mqttClient = mqtt.connect('mqtt://10.246.0.10:1883', '95cb7981-3d4c-4b35-aff0-73d5150be1be', 'gepc-producer', 'Bearer 95cb7981-3d4c-4b35-aff0-73d5150be1be:gepc-producer:26afc6e1');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (err) => {
    console.log(`MQTT error: ${err}`);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/publish', (req, res) => {
    // const { topic, message } = req.body;

    mqttClient.publish(req.body.message, (err) => {
        if (err) {
            console.log(`Failed to publish message: ${err}`);
            res.status(500).send('Failed to publish message');
        } else {
            console.log(`Message published to topic`);
            res.status(200).send(`Message published to topic`);
        }
    });
});

app.listen(port, () => {
    console.log(`REST API listening at http://localhost:${port}`);
});