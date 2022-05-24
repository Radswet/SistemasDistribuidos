const { Kafka, Partitioners } = require("kafkajs");

console.log("KAFKA_HOST: ", process.env.KAFKA_HOST);
const kafka = new Kafka({
  clientId: "login",
  brokers: [`${process.env.KAFKA_HOST}:9092`],
});
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

module.exports = producer;