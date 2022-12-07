let personsDao = require("../dao/persons-dao");

async function getAllNames() {
    return await personsDao.getAllNamesFromDB();
}

async function setNewNameRecord(record) {
    await personsDao.setNewNameRecordToDB(record);
}

async function getUserByName(name) {
    return await personsDao.getUserByNameFromDB(name);
}

module.exports = { getAllNames, setNewNameRecord, getUserByName }