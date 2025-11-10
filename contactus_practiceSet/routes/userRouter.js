const path = require('path');
const express = require('express');
const userRouter = express.Router();
const rootdir = require('../Utils/pathUtils')

app = express();

userRouter.get('/',(req,res,next)=>{
  res.sendFile(path.join(rootdir,'views','home.html'));
})

userRouter.get('/contact-us',(req,res,next)=>{
    res.sendFile(path.join(rootdir,'views','contactUs.html'));
})

userRouter.post('/contact-us',(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootdir,'views','detailsReg.html'));
})

module.exports = userRouter;