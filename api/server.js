const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const farmerUserRouter = require('../farmer-users/farmer-users-router.js');
// const customerUserRouter = require('../customer-users/customer-users-router.js');

const server = express();

server
    .use(helmet())
    .use(express.json())
    .use(cors())
    .use(morgan('combined'));

server.use('/api/farmers', farmerUserRouter);
// server.use('/api/customers', customerUserRouter);



server.get('/', (req, res) => {
    res.send('Server is alive!');
});

module.exports = server;