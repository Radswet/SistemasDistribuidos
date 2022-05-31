const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "login",
  brokers: [`kafka:9092`],
});
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

module.exports = producer;