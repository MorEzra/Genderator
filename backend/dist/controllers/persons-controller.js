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
            const nationalities = yield getNationalitiesByName(name);
            let data = [];
            for (let nationality of nationalities) {
                let countryID = nationality.country_id;
                let nameDetails = yield getNameDetailsByCountryID(name, countryID);
                data.push(nameDetails);
            }
            return { name: name, details: data };
        }
        catch (error) {
            return error;
        }
    });
}
function getNationalitiesByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.get(`https://api.nationalize.io?name=${name}`)
            .then(res => {
            let nationalities = res.data.country;
            return nationalities;
        }).catch(error => {
            return error.response;
            // TODO: check
        });
    });
}
function getNameDetailsByCountryID(name, countryID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.get(`https://api.genderize.io/?name=${name}&country_id=${countryID}`)
            .then(res => {
            let nameDetails = {
                gender: res.data.gender,
                nationality: res.data.country_id,
                probability: res.data.probability
            };
            return nameDetails;
        }).catch(error => {
            return error.response;
            // TODO: check
        });
    });
}
function setNewNameRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield personsLogic.getUserByName(record.name);
            if (user.length > 0)
                yield personsLogic.updateNameRecord(record);
            else
                yield personsLogic.setNewNameRecord(record);
        }
        catch (error) {
            return error;
        }
    });
}
function updateNameRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield personsLogic.updateNameRecord(record);
        }
        catch (error) {
            return error;
        }
    });
}
module.exports = { getAllNames, getDataByName, setNewNameRecord, updateNameRecord };
//# sourceMappingURL=persons-controller.js.map