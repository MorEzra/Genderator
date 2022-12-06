import express from 'express';
const server = express();
const port = 3001;
const cors = require('cors');

server.use(cors());

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(process.env.PORT || port, () => console.log(`Listening on ${port}`));