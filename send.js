#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://user:password@localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });
    for (let i=0; i < 5000; i++){
      channel.sendToQueue(queue, Buffer.from(`${msg}_${i}`));
      console.log(` [x] Sent ${msg}_${i}`);
    }
  });

  setTimeout(function() {
    connection.close();
    console.log('Closed connection');
    process.exit(0)
  }, 8000);
});
