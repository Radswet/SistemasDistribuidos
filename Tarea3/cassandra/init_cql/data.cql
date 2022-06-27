CREATE KEYSPACE ks1  WITH replication = {   'class': 'SimpleStrategy',   'replication_factor' : 2 };  
CREATE KEYSPACE ks2  WITH replication = {   'class': 'SimpleStrategy',   'replication_factor' : 3 };

CREATE TABLE IF NOT EXISTS ks1.paciente (
id int PRIMARY KEY,
nombre text,
apellido text,
rut text,
email text,
fecha_nacimiento text
);

CREATE TABLE IF NOT EXISTS ks2.receta(
id int PRIMARY KEY,
id_paciente int,
comentario text,
farmacos text,
doctor text
);