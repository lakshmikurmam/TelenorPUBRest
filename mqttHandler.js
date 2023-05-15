const mqtt = require('mqtt');

class MQTTHandler {
    constructor(brokerUrl, clientId, secretKey) {
        brokerUrl = '10.246.0.10'
        this.client = mqtt.connect(brokerUrl, {
            clientId: 'gepc-producer',
            username: '95cb7981-3d4c-4b35-aff0-73d5150be1be',
            password: 'Bearer 95cb7981-3d4c-4b35-aff0-73d5150be1be:gepc-producer:26afc6e1'

        });
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        });
        this.client.on('error', (err) => {
            console.log(`MQTT error: ${err}`);
        });
    }

    subscribe(topic) {
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.log(`Failed to subscribe to topic: ${err}`);
            } else {
                console.log(`Subscribed to topic ${topic}`);
            }
        });
    }

    publish(topic, message) {
        this.client.publish(topic, message, (err) => {
            if (err) {
                console.log(`Failed to publish message: ${err}`);
            } else {
                console.log(`Message published to topic ${topic}: ${message}`);
            }
        });
    }

    onMessage(callback) {
        this.client.on('message', (topic, message) => {
            callback(topic, message);
        });
    }

    disconnect() {
        this.client.end();
        console.log('Disconnected from MQTT broker');
    }
}
/*
// Example usage
const mqttClient = new MQTTHandler('mqtt://<broker-url>', '<client-id>', '<secret-key>');
mqttClient.subscribe('<topic>');
mqttClient.publish('<topic>', '<message>');
mqttClient.onMessage((topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
});
mqttClient.disconnect();
*/
module.exports = MQTTHandler;