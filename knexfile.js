require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_DEV_DATABASE,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_TEST_DATABASE,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
