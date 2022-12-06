const personsLogic = require("../logic/persons-logic");
const express = require("express");
const url = require('url');

const router = express.Router();

import { Person } from '../models/Person';

// get all names from DB
router.get("/", async (request, response, next) => {

    try {
        const namesList: Person[] = await personsLogic.getAllNames();
        response.json(namesList);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;