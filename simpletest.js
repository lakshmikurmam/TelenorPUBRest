const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://10.246.0.10:1883', '95cb7981-3d4c-4b35-aff0-73d5150be1be', 'gepc-producer', 'Bearer 95cb7981-3d4c-4b35-aff0-73d5150be1be:gepc-producer:26afc6e1');

client.on('connect', () => {
    console.log('Connected to broker');

    // Publish a message to the topic 'test'
    client.publish('test', 'Hello, world!', { qos: 1 }, (err, packet) => {
        if (err) {
            console.error('Error publishing message:', err);
        } else {
            console.log('Message published:', packet);
        }
    });
});