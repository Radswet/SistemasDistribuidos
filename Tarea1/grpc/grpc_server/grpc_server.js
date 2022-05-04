const { Pool, Client } = require('pg');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../example.proto";
// const items = require("./data.json");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const itemProto = grpc.loadPackageDefinition(packageDefinition);


const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'test',
  password: '1234',
  //port: 3211
})


const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};


const server = () => {
  const server = new grpc.Server();
  server.addService(itemProto.ItemService.service, {
    getItem: async (_, callback) => {
      const itemName = _.request.name;
      let item
      if(itemName){
        item = await pool.query(`SELECT * FROM Items WHERE Name ILIKE '%${itemName}%'`)
      } else{
        item = await pool.query('SELECT * FROM Items') 
      }
      callback(null, { items: item.rows})
    }
  });
  server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err != null) console.log(err);
    else {
      console.log("GRPC SERVER RUN AT http://localhost:50051");
      server.start();
    }
  });
};

exports.server = server;