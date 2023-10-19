const express = require('express');
const app = express();
const PORT = 8001;

// middlewares
app.set('view engine','ejs');
app.set('views','./views')
app.use(express.static('public'));



// routes

app.get('/',(req,res)=>{
    res.render('firstpage');
})
app.get('/home',(req,res)=>{
    res.send("hello ")
})



app.listen(PORT,()=>{
    console.log("server created sucessfully.....");
})