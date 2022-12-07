const personsLogic = require("../logic/persons-logic");
const express = require("express");

const router = express.Router();
const axios = require("axios");

import { Person, Details } from '../models/Person';

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
        const nationalities: any = await getNationalitiesByName(name);

        let data: Details[] = [];

        for (let nationality of nationalities) {
            let countryID = nationality.country_id;

            let nameDetails: Details = await getNameDetailsByCountryID(name, countryID);
            data.push(nameDetails);
        }

        return { name: name, details: data };
    }
    catch (error) {
        return error;
    }
}

async function getNationalitiesByName(name: string): Promise<any> {
    return await axios.get(`https://api.nationalize.io?name=${name}`)
        .then(res => {
            let nationalities = res.data.country;
            return nationalities;
        }).catch(error => {
            return error.response;
            // TODO: check
        });
}

async function getNameDetailsByCountryID(name: string, countryID: string): Promise<Details> {
    return await axios.get(`https://api.genderize.io/?name=${name}&country_id=${countryID}`)
        .then(res => {
            let nameDetails: Details = {
                gender: res.data.gender,
                nationality: res.data.country_id,
                probability: res.data.probability
            }

            return nameDetails;
        }).catch(error => {
            return error.response;
            // TODO: check
        });
}

async function setNewNameRecord(record) {
    try {
        let user = await personsLogic.getUserByName(record.name);

        // if name doesn't exist on DB then insert it
        if (user.length < 0)
            await personsLogic.setNewNameRecord(record);
    }
    catch (error) {
        return error;
    }
}

module.exports = { getAllNames, getDataByName, setNewNameRecord };