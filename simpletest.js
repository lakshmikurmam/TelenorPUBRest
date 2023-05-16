const mqtt = require('mqtt');

const username = 'gepc-producer';
const password = '26afc6e1';
const clientId = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
const host = '10.246.0.10:1883';

const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});

client.on('connect', () => {
    console.log('Connected to Telenor Connexion MQTT broker');
});

client.on('error', (err) => {
    console.error('Error connecting to Telenor Connexion MQTT broker:', err);
});