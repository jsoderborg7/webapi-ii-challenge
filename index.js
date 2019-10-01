const express = require('express');

const db = require('./data/db');

const server = express();

const port = 8888;
server.listen(port, () => console.log(`\n**Server listening on port ${port}**\n`));

server.use(express.json());

