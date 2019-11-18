const knex = require('knex');
require('dotenv').config();

const knexConfig = require('../knexfile.js');

const environment = process.env.NODE_ENV || "development";

module = knex(knexConfig[environment]);