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

// MQTT connection event handlers
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Publish a message
    //const topic = 'topic/to/publish';
    const id = crypto.randomBytes(16).toString("hex");
    const message = 'Hello, MQTT!' + id;
    for (let i = 0; i < 5; i++) {

        client.publish(MQTT_TOPIC, message, (error) => {
            if (error) {
                console.error('Failed to publish message:', error);
            } else {
                console.log('Message published successfully');
            }
        });
    }

    client.end(); // Close the MQTT connection after publishing
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (error) => {
    console.error('MQTT error:', error);
});