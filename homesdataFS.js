const fs = require('fs');
const path = require('path');
const rootDir = require('../Utils/pathUtils');
const Favourite = require('./favourite');

const homeDataPath = path.join(rootDir,'data','homes.json');

// const registeredHomes = [];

module.exports = class Home{
    constructor(homeName,price,rating,location,photoUrl){
        this.homeName = homeName;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.photoUrl = photoUrl;
    }

    save(){
        Home.fetchAll(registeredHomes=>{
            if(this.id){//edit home
                registeredHomes = registeredHomes.map(home=>
                    home.id===this.id? this : home )
            }
            else{
                this.id = Math.random().toString();
                registeredHomes.push(this);
            }
            
            fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),error =>{
            console.log("file writing concluded",error);
        })
        })
        
    }

    static fetchAll(callback){
        fs.readFile(homeDataPath,(err,data)=>{
            console.log("file read: ",err,data);
            if(!err){
                callback(JSON.parse(data));
            }
            //return registeredHomes;
            else{
            callback([]);
            }
        });

    }

    static findById(homeId,callback){
        this.fetchAll(homes => {
        const homeFound = homes.find(home => home.id === homeId);
        callback(homeFound);
        })
    }

    static deleteById(homeID, callback) {
        this.fetchAll(homes => {
            const updatedHomes = homes.filter(home => home.id !== homeID);
            fs.writeFile(homeDataPath, JSON.stringify(updatedHomes), (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                // Remove from favorites after successful home deletion
                Favourite.deleteFavById(homeID, (favErr) => {
                    if (favErr) {
                        console.log("Error removing from favorites:", favErr);
                    }
                    callback(null);
                });
            });
        });
    }
};
