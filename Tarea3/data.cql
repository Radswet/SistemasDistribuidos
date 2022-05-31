CREATE KEYSPACE tarea WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

CREATE TABLE IF NOT EXISTS tarea3 (
userid text PRIMARY KEY,
item_count int,
last_update_timestamp timestamp
);