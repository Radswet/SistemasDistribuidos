const { Pool, Client } = require('pg');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'test',
  password: '1234',
  //port: 3211
})

const PROTO_PATH = "../example.proto";
const items = require("./data.json");

pool.query('SELECT * FROM Items', (err,res)=> {
  if(err){
    console.log(err)
  }else {
    console.log(res)
  }
})
// const textquery = 'SELECT * FROM Items'

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const itemProto = grpc.loadPackageDefinition(packageDefinition);

const server = () => {
  const server = new grpc.Server();
  server.addService(itemProto.ItemService.service, {
    getItem: (_, callback) => {
      const itemName = _.request.name;
      const item = items.item_list.filter((obj) => obj.name.includes(itemName));
      callback(null, { items: item});
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