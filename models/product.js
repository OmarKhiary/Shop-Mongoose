const {getDb} =require('../util/database');
const {ObjectId} = require('mongodb');

class Product{
    constructor(title, price, description,imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
        this.userId = userId;
    }
    save(){
        const db = getDb();
        // Check if the product exists in the db or not
        let dbOperation;
        if(this._id){
            // update the product 
            dbOperation = db.collection('products')
                            .updateOne({_id: this._id}, {$set: this});
        }else {
            dbOperation =  db.collection('products').insertOne(this);
        }
        return  dbOperation
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
    }

    static fetchAll(){
        const db =getDb();
        return db
                .collection('products')
                .find()
                .toArray()
                .then(products => {
                    console.log(products)
                    return products;
                })
                .catch(err => console.log(err));
    }
    static findById(prodId){
        const db = getDb();
        return db
                .collection('products')
                .find({_id:new ObjectId(prodId)})
                .next()
                .then(product => {
                    console.log(product);
                    return product;
                })
                .catch(err => console.log(err));
    }
    static deleteById(prodId){
        const db =getDb();
        return db
                .collection('products')
                .deleteOne({_id: new ObjectId(prodId)})
                .then(() => console.log('Deleted'))
                .catch(err => console.log(err));
    }     
}

module.exports = Product;
  
