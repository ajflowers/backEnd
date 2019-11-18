require('dotenv').config();

module.exports = {

  development: {
<<<<<<< HEAD
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_DEV_DATABASE,
=======
    client: "pg",
    useNullAsDefault: true,
    connection: {
      database: process.env.DB_DATABASE,
>>>>>>> d532e35ef9731dac3b26ae71cfb32cf0993d6ca7
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

<<<<<<< HEAD
  development: {
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
=======

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
>>>>>>> d532e35ef9731dac3b26ae71cfb32cf0993d6ca7
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
<<<<<<< HEAD
      tableName: 'knex_migrations'
    }
  }

=======
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
>>>>>>> d532e35ef9731dac3b26ae71cfb32cf0993d6ca7
};
