import express from 'express';
const personsController = require("../controllers/persons-controller");
const server = express();
const port = 3001;
const cors = require('cors');

server.use(cors());

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use("/", personsController);

server.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`));