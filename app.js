const http = require('http');

const express = require('express');

const app = express();

app.use('/',(req, res, next)=>{
    console.log("entered first middleware");
    next();
})

app.post('/submit-details',(req, res, next)=>{
    console.log("entered second middleware");
    res.send("fill the form");
})

app.use('/',(req, res, next)=>{
    console.log("entered second middleware");
    res.send("welcome to homepage");
})

const server = http.createServer(app);
// const server = http.createServer((res,req)=>{
//     console.log(req);
//     syntax();
// });

const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`server is listening on port : http://localhost:${PORT}`);
})