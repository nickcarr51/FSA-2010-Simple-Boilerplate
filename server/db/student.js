const db = require('./db.js')
const { STRING,FLOAT,VIRTUAL } = db.Sequelize

const Student = db.define('student', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: VIRTUAL,
    get: function() {
      return `${this.firstName}@hogwards.com`
    },
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: STRING,
    defaultValue: 'public/images/profile_3.png'
  },
  gpa: {
    type: FLOAT,
    validate: {
      max: 4.0,
      min: 0.0
    }
  }
})

module.exports = Student
