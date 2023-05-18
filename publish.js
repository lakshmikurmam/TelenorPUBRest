const mqtt = require('mqtt');
const crypto = require("crypto");
const username = 'gepc-producer';
const password = '26afc6e1';
const clientId = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
const host = '10.246.0.10:1883';
let messageCount = 0;
const MQTT_TOPIC = 'MC/V1/testing';
const MQTT_QOS = 1;
//Testing
//var client = mqtt.connect('mqtt://test.mosquitto.org:1883');
const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});

client.on('connect', () => {
    console.log('Connected to Telenor Connexion MQTT broker');




    function publishmessage() {
        if (messageCount < 5) {
            let ts = Date.now();

            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let rand = Math.random() * 100;
            let sec = (Math.floor(ts / 1000));
            const id = crypto.randomBytes(16).toString("hex");
            let s1 = 'log generated MQ messages publishing :'
            const messageprint = year + "-" + month + "-" + date + ":" + sec + s1 + rand + ":"
            "seqid:" + id
            const message = 'Published message ' + messageprint + (messageCount + 1);
            client.publish(MQTT_TOPIC, message, { qos: MQTT_QOS });
            messageCount++;

            console.log('Published message:', message);

            setTimeout(publishmessage, 1000); // Publish a new message every 1 second
        } else {
            endConnection();
        }
    }
    publishmessage();
});

client.on('error', (error) => {
    console.error('MQTT Error:', error);
});
client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

function endConnection() {
    console.log('Ending MQTT connection');
    client.end();
}