//initialize db
const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/jpfp_db', {
  logging: false
})

module.exports = db
