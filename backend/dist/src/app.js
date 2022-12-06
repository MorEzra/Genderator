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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const { graphqlHTTP } = require('express-graphql');
const resolvers_1 = require("../schema/resolvers");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [resolvers_1.PersonsResolver],
        emitSchemaFile: true,
    });
    const server = (0, express_1.default)();
    const port = 3001;
    const cors = require('cors');
    server.use(cors());
    server.use(cors({ origin: "http://localhost:3000", credentials: true }));
    server.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
    server.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`));
});
main();
//# sourceMappingURL=app.js.map