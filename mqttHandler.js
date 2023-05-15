const mqtt = require('mqtt')

class MQTTHandler {
    constructor(host) {

        this.host = '10.246.0.10';
        this.port = 1883;
        this.AppID = '95cb7981-3d4c-4b35-aff0-73d5150be1be';
        this.token = 'Bearer f44a7c6a-219f-417d-9a1d-f2bafd38ad53:gepc-subs:14d1b530';

        /*this.host = 'https://mosquitto.org/';
        this.port = 1883;
        this.clientid = '963f3d5972dc4962aff21937eebd6a60';*/

    }

    connect() {
        this.client = mqtt.connect(this.host)

        this.client.on('error', function(err) {
            console.log(err)
            this.client.end()
        })

        this.client.on('connect', function() {
            console.log('MQTT client connected...')
        })

        // I need this to send message back to app.js
        this.client.on('message', function(topic, message) {
            if (!message.toString()) message = 'null'

            console.log(JSON.parse(message.toString()))
        })

        this.client.on('close', function() {
            console.log('MQTT client connected...')
        })
    }

    subscribeTopic(topic) {
        this.client.subscribe(topic)
    }

    unsubscribeTopic(topic) {
        this.client.unsubscribe(topic)
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message)
    }
}

module.exports = MQTTHandler