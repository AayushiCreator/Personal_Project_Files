//core module
const path = require('path');

//external module
const express = require('express');
const storeRouter = express.Router();

//local modules
// const rootdir = require('../Utils/pathUtils');
// const { registeredHome } = require('./hostRouter');
const storeController = require('../controllers/storeController');

// Home page route - shows all registered homes
storeRouter.get('/', storeController.getIndex);

storeRouter.get('/home-list',storeController.getHomes);

storeRouter.get('/bookings',storeController.getBookings);

storeRouter.get('/favourite',storeController.getFavourites);

storeRouter.get('/home/:homeId',storeController.getHomeDetails);

storeRouter.post('/favourite',storeController.postAddToFavourite);

storeRouter.post('/remove-favourite/:homeId',storeController.postRemoveFavourite);



module.exports = storeRouter;
//exports.storeRouter = storeRouter;