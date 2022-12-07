const personsLogic = require("../logic/persons-logic");
const express = require("express");

const router = express.Router();
const axios = require("axios");

import { Person } from '../models/Person';

// get all names from DB
async function getAllNames(): Promise<Person[]> {
    try {
        const names: Person[] = await personsLogic.getAllNames();
        return names;
    }
    catch (error) {
        return error;
    }
}

async function getDataByName(name: string): Promise<Person> {
    try {
        const nationality: any = await getNationalityByName(name);

        let countryID = nationality.country_id;

        let nameDetails: Person = await getNameDetailsByCountryID(name, countryID);

        return nameDetails;
    }
    catch (error) {
        return error;
    }
}

async function getNationalityByName(name: string): Promise<any> {
    return await axios.get(`https://api.nationalize.io?name=${name}`)
        .then(res => {
            let nationality = res.data.country[0];
            return nationality;
        }).catch(error => {
            console.log(error);
            
            return error;
            // TODO: check
        });
}

async function getNameDetailsByCountryID(name: string, countryID: string): Promise<Person> {
    return await axios.get(`https://api.genderize.io/?name=${name}&country_id=${countryID}`)
        .then(res => {
            let nameDetails: Person = {
                name: res.data.name,
                gender: res.data.gender,
                nationality: res.data.country_id,
                probability: res.data.probability
            }

            return nameDetails;
        }).catch(error => {
            console.log(error);
            
            return error;
            // TODO: check
        });
}

async function setNewNameRecord(record) {
    try {
        let user = await personsLogic.getUserByName(record.name);

        // if name doesn't exist on DB then insert it
        if (user.length == 0)
            await personsLogic.setNewNameRecord(record);
    }
    catch (error) {
        return error;
    }
}

module.exports = { getAllNames, getDataByName, setNewNameRecord };