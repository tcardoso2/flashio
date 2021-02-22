#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

//client.set("key2", "value2", redis.print);
client.get("key2", redis.print);


amqp.connect('amqp://user:password@localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue, function(msg) {
      let _msg = msg.content.toString();
      console.log(" [x] Received %s", _msg);
      //Redis test
      client.set(_msg, `value_${_msg}`, redis.print);
    }, {
      noAck: true
    });
  })
})
