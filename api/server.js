const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

server
    .use(helmet())
    .use(express.json())
    .use(cors())
    .use(morgan('combined'));

server.get('/', (req, res) => {
    res.send('Server is alive!');
});

module.exports = server;