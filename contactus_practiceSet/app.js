const http = require('http');
const express = require('express');
const userRouter = require('./routes/userRouter');
const path = require('path');
const rootdir = require('./Utils/pathUtils');

const app = express();
app.use(express.urlencoded());

app.use((req,res,next)=>{
    console.log( "dummy middleware",req.url,req.method);
    next();
})

app.use(userRouter);

app.use(express.static(path.join(rootdir,'public')));

app.use((req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','404.html'));
})



const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port : http://localhost:${PORT}`);
})