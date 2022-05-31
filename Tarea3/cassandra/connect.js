const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['cassandra1', 'cassandra2', 'cassandra3'],
  localDataCenter: 'cassandra-cluster'
});

client.connect(function (err) {
  assert.ifError(err);
});
module.exports= client;