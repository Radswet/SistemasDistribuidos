const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['cassandra'],
  localDataCenter: 'datacenter1',
  credentials: { username: process.env.CASSANDRA_USERNAME, password: process.env.CASSANDRA_PASSWORD}
});

module.exports= client;