//import all models
const db = require('./db.js')
const Campus = require('./campus.js')
const Student = require('./student.js')

//add associations
Student.belongsTo(Campus)
Campus.hasMany(Student)

//export db and models
module.exports = {
  db,
  Campus,
  Student
}


