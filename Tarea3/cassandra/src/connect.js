const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['cassandra1'],
  localDataCenter: 'cassandra-cluster',
  credentials: { username: process.env.CASSANDRA_USERNAME, password: process.env.CASSANDRA_PASSWORD}
});

client.connect(function (err) {
  assert.ifError(err);
});
module.exports= client;