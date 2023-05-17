const mqtt = require('mqtt');

const username = 'gepc-producer';
const password = '26afc6e1';
const clientId = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
const host = '10.246.0.10:1883';
const MQTT_TOPIC = 'MC/V1/testing';
const MQTT_QOS = 1;
const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});

client.on('connect', () => {
    console.log('Connected to Telenor Connexion MQTT broker');
});
// Publish message to MQTT topic
client.publish(MQTT_TOPIC, MQTT_MESSAGE, { qos: MQTT_QOS }, function(err) {
    if (err) {
        console.error(`Failed to publish message: ${err}`);
    } else {
        console.log(`Message published to topic: ${MQTT_TOPIC}`);
        // Disconnect from MQTT broker
        client.end();
        console.log(`Connection END`);
    }
});


client.on('error', function(err) {
    console.error(`Failed to connect to MQTT broker: ${err}`);
});