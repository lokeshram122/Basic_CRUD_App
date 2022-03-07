const express = require('express');
const app = express();
const Router = require('./router')
const bodyparser =require('body-parser')
var Port = process.env['PORT']


app.use(bodyparser.json());

app.use('/',Router)


app.listen(Port,()=>{
    console.log("listening to 3000");
})


