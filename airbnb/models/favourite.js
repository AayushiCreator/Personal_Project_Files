const dataB = require('../Utils/databaseUtil');
const { ObjectId } = require('mongodb');

module.exports = class Favourite{

    static async addToFavourite(homeId, callback){
        try {
            const favourites = await Favourite.getFavourites();
            if(favourites.includes(homeId)){
                callback("home already marked favourite");
            }
            else{
                favourites.push(homeId);
                await dataB.execute('favourites', 'updateOne', 
                    { _id: 'user_favourites' }, 
                    { $set: { favourites: favourites } }, 
                    { upsert: true }
                );
                callback(null);
            }
        } catch (error) {
            callback(error);
        }
    }

    static async getFavourites(callback){
        try {
            const result = await dataB.execute('favourites', 'findOne', { _id: 'user_favourites' });
            const favourites = result ? result.favourites : [];
            if (callback) {
                callback(favourites);
            }
            return favourites;
        } catch (error) {
            if (callback) {
                callback([]);
            }
            return [];
        }
    }

    static async deleteFavById(delhomeID, callback) {
        try {
            const favourites = await Favourite.getFavourites();
            const updatedFavorites = favourites.filter(homeId => homeId !== delhomeID);
            await dataB.execute('favourites', 'updateOne', 
                { _id: 'user_favourites' }, 
                { $set: { favourites: updatedFavorites } }, 
                { upsert: true }
            );
            if (callback) {
                callback(null);
            }
        } catch (error) {
            if (callback) {
                callback(error);
            }
        }
    }
};