"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const personsLogic = require("../logic/persons-logic");
const express = require("express");
const router = express.Router();
const axios = require("axios");
// get all names from DB
function getAllNames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const names = yield personsLogic.getAllNames();
            return names;
        }
        catch (error) {
            return error;
        }
    });
}
function getDataByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nationality = yield getNationalityByName(name);
            let countryID = nationality.country_id;
            let nameDetails = yield getNameDetailsByCountryID(name, countryID);
            return nameDetails;
        }
        catch (error) {
            return error;
        }
    });
}
function getNationalityByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.get(`https://api.nationalize.io?name=${name}`)
            .then(res => {
            let nationality = res.data.country[0];
            return nationality;
        }).catch(error => {
            console.log(error);
            return error;
            // TODO: check
        });
    });
}
function getNameDetailsByCountryID(name, countryID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.get(`https://api.genderize.io/?name=${name}&country_id=${countryID}`)
            .then(res => {
            let nameDetails = {
                name: res.data.name,
                gender: res.data.gender,
                nationality: res.data.country_id,
                probability: res.data.probability
            };
            return nameDetails;
        }).catch(error => {
            console.log(error);
            return error;
            // TODO: check
        });
    });
}
function setNewNameRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield personsLogic.getUserByName(record.name);
            // if name doesn't exist on DB then insert it
            if (user.length == 0)
                yield personsLogic.setNewNameRecord(record);
        }
        catch (error) {
            return error;
        }
    });
}
module.exports = { getAllNames, getDataByName, setNewNameRecord };
//# sourceMappingURL=persons-controller.js.map