var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let mongodbConnection = require("./mongo-connection-wrapper");
function getAllNamesFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mongodbConnection.getDB().collection("names").find({}).toArray();
    });
}
function setNewNameRecordToDB(record) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongodbConnection.getDB().collection("names").insertOne(record);
    });
}
function getUserByNameFromDB(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mongodbConnection.getDB().collection("names").find({ name: name }).toArray();
    });
}
module.exports = { getAllNamesFromDB, setNewNameRecordToDB, getUserByNameFromDB };
//# sourceMappingURL=persons-dao.js.map