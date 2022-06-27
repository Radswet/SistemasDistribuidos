const cassandra_client = require("./connect");
const express = require("express");
const app = express();
app.use(express.json());

async function insertReceta(newP_id, comentario, farmacos, doctor) {
  const query = `SELECT MAX(id) AS max_id FROM ks2.receta;`;
  const Recetas = await cassandra_client.execute(query);
  const newR_id = Recetas.rows[0].max_id + 1;
  const queryInsert = `INSERT INTO ks2.receta(id, id_paciente, comentario, farmacos, doctor)
                        VALUES (${newR_id}, ${newP_id}, '${comentario}','${farmacos}','${doctor}');`;
  await cassandra_client.execute(queryInsert);
}

async function insertPaciente(nombre, apellido, rut, email, fecha_nacimiento) {
  const query = `SELECT MAX(id) AS max_id FROM ks1.paciente;`;
  const Pacientes = await cassandra_client.execute(query);
  const newP_id = Pacientes.rows[0].max_id + 1;
  const queryInsert = `INSERT INTO ks1.paciente(id,nombre, apellido, rut, email, fecha_nacimiento)
                          VALUES (${newP_id},'${nombre}','${apellido}','${rut}','${email}','${fecha_nacimiento}');`;
  await cassandra_client.execute(queryInsert);

  return newP_id;
}

//   app.get("/", async (req, res) => {
//     res.type("application/json").code(200);
//     const query = "SELECT * FROM ks2.receta;";
//     const data = await client.execute(query);
//     return {  data: data.rows };
//   });

app.post("/create", async (req, res) => {
  const {
    nombre,
    apellido,
    rut,
    email,
    fecha_nacimiento,
    comentario,
    farmacos,
    doctor,
  } = req.body;
  const query = `SELECT id FROM ks1.paciente WHERE rut = '${rut}' ALLOW FILTERING; `;
  const data = await cassandra_client.execute(query);

  if (data.rowLength == 0) {
    // Es como un if not exist
    const newP_id = await insertPaciente(
      nombre,
      apellido,
      rut,
      email,
      fecha_nacimiento
    );
    await insertReceta(newP_id, comentario, farmacos, doctor);
    const success = "Se ha creado el paciente y la receta correspondiente";
    res.send(success);
  } else {
    // Si encuentra el cliente entonces se crea la receta
    const idPaciente = data.rows[0].id;
    await insertReceta(idPaciente, comentario, farmacos, doctor);
    const success = "Receta creada para el paciente";
    res.send(success);
  }
});

app.post("/edit", async (req, res) => {
  const { id, comentario, farmacos, doctor } = req.body;
  const query = `SELECT id FROM ks2.receta WHERE id = ${id};`;
  const data = await cassandra_client.execute(query);

  if (data.rowLength == 0) {
    res.code(404);
    const dontSuccess = "Id no corresponde a ninguna receta";
    res.send(dontSuccess);
  } else {
    const query = `UPDATE ks2.receta SET comentario = '${comentario}', farmacos = '${farmacos}', doctor = '${doctor}' WHERE id = ${id};`;
    await cassandra_client.execute(query);
    const success = "Receta actualizada con exito";
    res.send(success);
  }
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  const query = `SELECT id FROM ks2.receta WHERE id= ${id};`;
  const data = await cassandra_client.execute(query);

  if (data.rowLength == 0) {
    res.code(404);
    const dontSuccess = "Id no corresponde a ninguna receta";
    res.send(dontSuccess);
  } else {
    const query2 = `DELETE FROM ks2.receta WHERE id = ${id}`;
    await cassandra_client.execute(query2);
    const success = "Receta eliminada";
    res.send(success);
  }
});

app.listen(3000);
