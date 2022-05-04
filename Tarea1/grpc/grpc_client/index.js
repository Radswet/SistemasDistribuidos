const express=require("express")
const cors= require("cors")
const client= require("./grpc_client")

const app= express()

app.get('/:name?', (req, res)=>{
    client.getItem({name:req.params.name}, (_,data)=>{res.json(data)})
    
})
app.listen(3000)