const fs = require('fs');
const path = require('path');
const rootDir = require('../Utils/pathUtils');

const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

// const registeredHomes = [];

module.exports = class Favourite{

    static addToFavourite(homeId,callback){
        Favourite.getFavourites(favourites=>{
            if(favourites.includes(homeId)){
                callback("home already marked favourite");
            }
            else{
                favourites.push(homeId);
                fs.writeFile(favouriteDataPath,JSON.stringify(favourites),callback);
            }
        });
    }


    static getFavourites(callback){
        fs.readFile(favouriteDataPath,(error,data)=>{
            callback(!error ? JSON.parse(data) : []);
        });
    }

    static deleteFavById(delhomeID, callback) {
        Favourite.getFavourites(homeIds => {
            const updatedFavorites = homeIds.filter(homeId => homeId !== delhomeID);
            fs.writeFile(favouriteDataPath, JSON.stringify(updatedFavorites), (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null);
            });
        });
    }
        
    
};