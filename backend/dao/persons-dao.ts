let mongodbConnection = require("./mongo-connection-wrapper");

async function getAllNamesFromDB() {
    return await mongodbConnection.getDB().collection("names").find({}).toArray();
}

module.exports = { getAllNamesFromDB }