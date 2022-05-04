const express = require('express');
const redis = require('redis');
const connectRedis = require('connect-redis');
const cors = require('cors');
var grpcClient= require("../../grpc/grpc_client/grpc_client");
// const { createClient } = require('redis');
var bodyParser = require('body-parser');

const app = express();

// app.use(cors());
// app.use(bodyParser.sql());
// app.use(bodyParser.urlencoded({ extended: true }));

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,   
    // port: 6379
});

redisClient.on("error", function(error) {
    console.error(error);
});
  
const client = createClient({
    socket: { host: process.env.REDIS_HOST, port: 6379 },
  });
  console.log({ host: process.env.REDIS_HOST, port: 6379 });
  client.on("error", (err) => console.error("Redis Client Error", err));
  await client.connect();
  
  app.get("/inventory/search", async (req, res) => {
    const { query } = req;
    const q = query.q;
  
    const redisRes = await client.get(q);
    console.log(redisRes);
    if (redisRes) {
      res.status(200).json(JSON.parse(redisRes));
    } else {
      grpcClient.GetItem({ name: q }, async (err, data) => {
        if (err) {
          res.status(500).json({ err });
        } else {
          await client.set(q, JSON.stringify(data));
          res.status(200).json({ data });
        }
      });
    }
  });

app.listen(3000, () => {
    console.log("Server started at port 3000");
});