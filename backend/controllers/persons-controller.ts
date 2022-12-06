const personsLogic = require("../logic/persons-logic");
const express = require("express");

const router = express.Router();

import { Person } from '../models/Person';

// get all names from DB
async function getAllNames():Promise<Person[]> {
    try {
        const names: Person[] = await personsLogic.getAllNames();
        return names;
    }
    catch (error) {
        return error;
    }
}

async function getDataByName(name:string):Promise<Person> {
    try {
        const data: Person = await personsLogic.getAllNames();
        return data;
    }
    catch (error) {
        return error;
    }
}

module.exports = { getAllNames, getDataByName };