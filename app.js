const express = require('express');
const cors = require("cors")
const app = express();
const Router = require('./router')
const bodyparser =require('body-parser')
require('dotenv').config({path:__dirname+'\\.env'})
var Port = process.env['PORT']

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });


app.use(bodyparser.json());

app.use('/',Router)


app.listen(Port,()=>{
    console.log("listening to",Port);
})


