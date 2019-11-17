const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server
    .use(helmet())
    .use(express.json())
    .use(cors());

server.get('/', (req, res) => {
    res.send('Server is alive!');
});

module.exports = server;