const express=require("express")
const cors= require("cors")
const client= require("./grpc_client")
const redis = require('redis')

const app= express()
const redisClient = redis.createClient({
    host: 'cache',   
    // port: 6379
});

redisClient.on("error", function(error) {
    console.error(error);
});

app.get('/:name?', async (req, res)=>{
    redisClient.get(req.params.name || "", (err, data)=>{
        if(err){
            client.getItem({name:req.params.name}, async (_,data)=>{
                await redisClient.set(req.params.name || "", JSON.stringify(data))
                res.json(data)})
        }else{
            if(!data){
                client.getItem({name:req.params.name}, async (_,data)=>{
                    await redisClient.set(req.params.name || "", JSON.stringify(data))
                    res.json(data)})
            }else{
                res.json(data)
            }
        }
    })
})
app.listen(3000)