const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const farmerUserRouter = require('../routes/farmer-users-router.js');
const customerUserRouter = require('../routes/customer-users-router.js');
const farmRouter = require('../routes/farms_route.js');
const inventoryRouter = require('../routes/inventory_route.js');
const ordersRouter = require('../routes/orders_router.js');

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
server.use('/api/orders', validateToken, ordersRouter);



server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is alive!' });
});

module.exports = server;