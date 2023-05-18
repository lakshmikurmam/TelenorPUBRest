const mqtt = require('mqtt');
const crypto = require("crypto");
const username = 'gepc-producer';
const password = '26afc6e1';
const clientId = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
const host = '10.246.0.10:1883';
const MQTT_TOPIC = 'MC/V1/testing';
const MQTT_QOS = 1;
let MQTT_MESSAGE;

const client1 = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});
var client = mqtt.connect('mqtt://test.mosquitto.org:1883');
client.on('connect', function(topic, message, packet) {
    console.log('Connected to Telenor Connexion MQTT broker');
});
// Publish message to MQTT topic
setInterval(function() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let rand = Math.random() * 100;
    let sec = (Math.floor(ts / 1000));
    const id = crypto.randomBytes(16).toString("hex");
    const s = "log generated MQ messages publishing "
    const seq = "seqid:"
        //console.log(year + "-" + month + "-" + date + ":" + sec, "log generated MQ messages publishing :" + rand + ":", "seqid:" + id)
    MQTT_MESSAGE = year + "-" + month + "-" + date + ":" + sec, +s + +rand + ":", +seq + +id
        //'year + "-" + month + "-" + date + ":" + sec, "log generated MQ messages publishing :" + rand + ":", "seqid:" + id '
    client.publish(MQTT_TOPIC, MQTT_MESSAGE, { qos: MQTT_QOS }, function(err) {

        // client.publish(MQTT_TOPIC, MQTT_MESSAGE, { qos: MQTT_QOS }, String(rand), function(err) {
        if (err) {
            console.error(`Failed to publish message: ${err}`);
        } else {

            console.log(`Message published to topic: ${MQTT_TOPIC} : ${MQTT_MESSAGE} ${s} ${seq}${id}`);

            client.end();
            console.log(`Connection END`);
        }
    });


    client.on('error', function(err) {
        console.error(`Failed to connect to MQTT broker: ${err}`);
    });

}, 4000);