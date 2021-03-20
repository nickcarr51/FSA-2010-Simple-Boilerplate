const db = require('./db.js')
const { STRING, TEXT } = db.Sequelize

const Campus = db.define('campus', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'public/images/placeholder-image.webp'
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT
  }
})

module.exports = Campus
