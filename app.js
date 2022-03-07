const express = require('express');
const app = express();
const Router = require('./router')
const bodyparser =require('body-parser')

app.use(bodyparser.json());

app.use('/',Router)


app.listen(3000,()=>{
    console.log("listening to 3000");
})


