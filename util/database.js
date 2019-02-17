const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://khairy:hEXEJMisDGngU5jT@cluster0-dyyja.mongodb.net/shop?retryWrites=true',
        {useNewUrlParser: true}
    ).then( client => {
        console.log('Connected!');
        _db = client.db();
        callback(client);
    }).catch(err => {
        console.log(err)
        throw err;
    });
}
// Get The Data Base If It Founded
const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

module.exports = {mongoConnect, getDb};