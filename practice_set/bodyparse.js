const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use((req,res,next)=>{
    console.log("first dummy middleware",req.url,req.method);
    next();
})

app.use((req,res,next)=>{
    console.log( "second dummy middleware",req.url,req.method);
    next();
})

app.get('/',(req,res,next)=>{
    console.log("handling / for GET",req.url,req.method);
    res.send(`<h1>welcome to page 1</h1>
    <a href= '/contact-us'>contact us</a>`);
})

app.get('/contact-us',(req,res,next)=>{
    console.log("handling /contact-us for GET",req.url,req.method);
    res.send(`<h1>give ur details</h1>
        <form action= "/contact-us" method="POST">
        <input type= "text" name="name" placeholder="enter ur name"/>
        <input type= "email" name="email" placeholder="enter email"/>
        <input type="submit"/>
        </form>
        `);
});

app.post('/contact-us',(req,res,next)=>{
    console.log("handling first /contact-us for POST",req.url,req.method,req.body);
    
    next();
})

app.use(bodyParser.urlencoded());

app.post('/contact-us',(req,res,next)=>{
    console.log("handling /contact-us for POST",req.url,req.method,req.body);
    res.send(`<h1>thanks for details</h1>`);
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server is listening on port : http://localhost:${PORT}`);
})