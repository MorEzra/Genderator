let mongodbConnection = require("./mongo-connection-wrapper");

async function getAllNamesFromDB() {
    return await mongodbConnection.getDB().collection("names").find({}).toArray();
}

async function setNewNameRecordToDB(record) {
    await mongodbConnection.getDB().collection("names").insertOne(record);
}

async function getUserByNameFromDB(name) {
    return await mongodbConnection.getDB().collection("names").find({ name: name }).toArray();
}

module.exports = { getAllNamesFromDB, setNewNameRecordToDB, getUserByNameFromDB }