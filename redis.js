const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

//client.set("key2", "value2", redis.print);
client.get("key2", redis.print);
