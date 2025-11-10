const fs = require('fs');
const path = require('path');
const rootDir = require('../Utils/pathUtils');
const { getDb } = require('../Utils/databaseUtil');

// const favouriteDataPath = path.join(rootDir, 'data', 'favourites.json');

// const registeredHomes = [];

module.exports = class Favourite{
    constructor(homeId){
        this.homeId=homeId;
    }

    save(){
        const db = getDb();
        return db.collection('favourites').findOne({homeId:this.homeId}).then(existingfav=>{
            if(!existingfav){
                return db.collection('favourites').insertOne(this);
            }
            return Promise.resolve();
        })
}

    static getFavourites(){
        const db = getDb();
        return db.collection('favourites').find().toArray();
        
    }

    static deleteFavById(delhomeID) {
        
        const db = getDb();
        return db.collection('favourites').deleteOne({homeId :  delhomeID });
        
    }

};