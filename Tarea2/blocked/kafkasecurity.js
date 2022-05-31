const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "security",
  brokers: [`kafka:9092`],
});
const consumer = kafka.consumer({ groupId: "security-group" });

module.exports = consumer;