const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/hostController');

// GET route for adding a new home
hostRouter.get('/add-home', hostController.getAddHomes);

// POST route for adding a new home
hostRouter.post('/add-home', hostController.postAddHomes);

hostRouter.get('/host-homes', hostController.getHostHomes);

hostRouter.get('/edit-home/:homeId', hostController.getEditHomes);

hostRouter.post('/edit-home', hostController.postEditHomes);

hostRouter.post('/delete-home/:homeId', hostController.postDeleteHomes);

module.exports = hostRouter;