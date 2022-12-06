let personsDao = require("../dao/persons-dao");

async function getAllNames() {
    return await personsDao.getAllNamesFromDB();
}

module.exports = { getAllNames }