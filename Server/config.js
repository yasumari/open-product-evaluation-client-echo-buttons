const env = process.env.NODE_ENV || 'dev' // 'dev' or 'test'
const path = require('path')

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT, 10) || 27017,
    name: process.env.DEV_DB_NAME || 'db',
  },
  seeder: {
    database: {
      host: process.env.DEV_DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT, 10) || 27017,
      name: process.env.DEV_DB_NAME || 'db',
    },
    inputPath: path.resolve(__dirname, './seeds/data'),
    dropDatabase: true,
  },
}

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT, 10) || 3000,
  },
  db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT, 10) || 27017,
    name: process.env.TEST_DB_NAME || 'test',
  },
  seeder: {
    database: {
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT, 10) || 27017,
      name: process.env.TEST_DB_NAME || 'db',
    },
    inputPath: path.resolve(__dirname, './seeds/data'),
    dropDatabase: true,
  },
}

const config = {
  dev,
  test,
}

module.exports = config[env]
