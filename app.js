const express = require('express');
const app = express();
const Router = require('./router')
const bodyparser =require('body-parser')
require('dotenv').config({path:__dirname+'\\.env'})
var Port = process.env['PORT']


app.use(bodyparser.json());

app.use('/',Router)


app.listen(Port,()=>{
    console.log("listening to",Port);
})


