const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://mor3311:tuniFg1v9Opqb4fw@cluster0.ldhcc3y.mongodb.net/test';
const client = new MongoClient(uri);
let connection;

try {
    // Connect to the MongoDB cluster
    client.connect();
    connection = client.db("persons");
} catch (e) {
    console.error(e);
} finally {
    client.close();
}

function getDB() {
    return connection;
}

module.exports = {
    getDB
};