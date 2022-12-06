import express from 'express';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
const { graphqlHTTP } = require('express-graphql');
import { PersonsResolver } from '../schema/resolvers';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [PersonsResolver],
    emitSchemaFile: true,
  })
  
  const server = express();
  const port = 3001;
  const cors = require('cors');
  
  server.use(cors());
  
  server.use(cors({ origin: "http://localhost:3000", credentials: true }));
  
  server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }));
  
  server.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`));
}

main();