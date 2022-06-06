
CREATE TABLE IF NOT EXISTS paciente (
id int PRIMARY KEY,
nombre text,
apellido text,
rut text,
email text,
fecha_nacimiento text
);

CREATE TABLE IF NOT EXISTS receta(
id int PRIMARY KEY,
id_paciente int,
comentario text,
farmacos text,
doctor text
);