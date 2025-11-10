const { ObjectId } = require('mongodb');
const {getDb} = require('../Utils/databaseUtil');

// const registeredHomes = [];

module.exports = class Home{
    constructor(homeName,price,rating,location,photoUrl,description,_id){
        this.homeName = homeName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.photoUrl = photoUrl;
        this.description = description;
        this._id = _id;
    }

    save(){
    const db = getDb();
        if(this._id){//edit
            const updateFields = {
                homeName:this.homeName,
                price:this.price,
                rating:this.rating,
                location:this.location,
                photoUrl:this.photoUrl,
                description:this.description
            };
            return db.collection('homes').updateOne({_id : new ObjectId(String(this._id))},{$set:updateFields});
            
        }
        else{//insert
            return db.collection('homes').insertOne(this);
        }
        
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId){
        const db = getDb();
        return db.collection('homes').find({_id : new ObjectId(String(homeId))}).next();
        
    }

    static deleteById(homeId) {
        const db = getDb();
        return db.collection('homes').deleteOne({_id : new ObjectId(String(homeId))});
        
    }
};
