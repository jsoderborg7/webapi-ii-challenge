const express = require('express');

const postsRouter = require('./posts-router');

const db = require('./data/db');

const server = express();

const port = 8888;
server.listen(port, () => console.log(`\n**Server listening on port ${port}**\n`));

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) =>{
  res.json('Yay! I am working!');
});