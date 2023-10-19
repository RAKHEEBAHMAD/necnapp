const express = require('express');
const app = express();
const PORT = 8000;

app.get('/',(req,res)=>{
    res.send("");
})








app.listen(PORT,()=>{
    console.log("server created sucessfully.....");
})