const dataB = require('../Utils/databaseUtil');
const { ObjectId } = require('mongodb');

module.exports = class Home{
    constructor(homeName, price, rating, location, photoUrl, description, id){
        this.homeName = homeName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.photoUrl = photoUrl;
        this.description = description;
        this._id = id ? new ObjectId(id) : null;
    }

    async save(){
        const homeData = {
            homeName: this.homeName,
            price: this.price,
            rating: this.rating,
            location: this.location,
            photoUrl: this.photoUrl,
            description: this.description
        };

        if(this._id){
            // Update existing home
            return await dataB.execute('homes', 'updateOne', 
                { _id: this._id }, 
                { $set: homeData }
            );
        }
        else{
            // Insert new home
            return await dataB.execute('homes', 'insertOne', homeData);
        }
    }

    static async fetchAll(){
        return await dataB.execute('homes', 'find', {});
    }

    static async findById(homeId){
        try {
            const objectId = new ObjectId(homeId);
            return await dataB.execute('homes', 'findOne', { _id: objectId });
        } catch (error) {
            console.error('Invalid ObjectId:', error);
            return null;
        }
    }

    static async deleteById(homeId) {
        try {
            const objectId = new ObjectId(homeId);
            return await dataB.execute('homes', 'deleteOne', { _id: objectId });
        } catch (error) {
            console.error('Invalid ObjectId:', error);
            return null;
        }
    }
};
