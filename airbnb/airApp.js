const path = require('path');//to serve  html files
const express = require('express');
const hostRouter = require('./routes/hostRouter');
const storeRouter = require('./routes/storeRouter');
const errorController = require('./controllers/errors');
const rootDir = require('./Utils/pathUtils');
const app = express();

app.set('view engine','ejs');
//app.set('views','views');
app.set('views', path.join(rootDir, 'views'));

app.use(express.urlencoded({extended: false}));//body parser
app.use(express.json()); // JSON parser

app.use('/host', hostRouter); // Host path for host routes
app.use('/', storeRouter); // Root path for user routes

app.use(express.static(path.join(rootDir,'public')));

app.use(errorController.get404);

app.use(errorController.get500);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is listening on port : http://localhost:${PORT}`);
})