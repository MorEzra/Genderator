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
// get all names from DB
function getAllNames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const namesList = yield personsLogic.getAllNames();
            return namesList;
        }
        catch (error) {
            return error;
        }
    });
}
module.exports = { getAllNames };
//# sourceMappingURL=persons-controller.js.map