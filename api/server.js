const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const farmerUserRouter = require('../routes/farmer-users-router.js');
const customerUserRouter = require('../routes/customer-users-router.js');
const farmRouter = require('../routes/farms_route.js');
const inventoryRouter = require('../routes/inventory_route.js');

const validateToken = require('../auth/restricted-middleware.js');

const server = express();

server
    .use(helmet())
    .use(express.json())
    .use(cors())
    .use(morgan('combined'));

server.use('/api/farmers', farmerUserRouter);
server.use('/api/customers', customerUserRouter);
server.use('/api/farms', validateToken, farmRouter);
server.use('/api/inventory', validateToken, inventoryRouter);


server.get('/', (req, res) => {
    res.send('Server is alive!');
});

module.exports = server;