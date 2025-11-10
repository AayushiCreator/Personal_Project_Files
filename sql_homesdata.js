const dataB = require('../Utils/databaseUtil');

// const registeredHomes = [];

module.exports = class Home{
    constructor(homeName,price,rating,location,photoUrl,description,id){
        this.homeName = homeName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.photoUrl = photoUrl;
        this.description = description;
        this.id = id;
    }

    save(){
        if(this.id){
            return dataB.execute('UPDATE homes SET homeName=?,price=?, rating=?, location=?, photoUrl=?, description=? WHERE id=?',[this.homeName,this.price,this.rating,this.location,this.photoUrl,this.description,this.id]);
        }
        else{
        return dataB.execute('INSERT INTO homes(homeName,price, rating, location, photoUrl, description) VALUES(?, ?, ?, ?, ?, ?)',[this.homeName,this.price,this.rating,this.location,this.photoUrl,this.description]);
        }
    }

    static fetchAll(){
       return dataB.execute("SELECT * FROM homes");

    }

    static findById(homeId){
        return dataB.execute("SELECT * FROM homes WHERE id=?",[homeId]);
    }

    static deleteById(homeId) {
        return dataB.execute("DELETE FROM homes WHERE id=?",[homeId]);
    }
};
