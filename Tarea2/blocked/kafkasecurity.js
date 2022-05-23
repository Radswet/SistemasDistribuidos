const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "security",
  brokers: [`${process.env.KAFKA_HOST}:9092`],
});

module.exports = kafka;