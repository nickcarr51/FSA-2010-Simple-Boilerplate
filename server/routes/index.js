const router = require('express').Router()
const {db, Campus, Student} = require('../../server/db')

router.get('/allCampuses', async(req,res,next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.send(allCampuses);
  } catch(err) {
    next(err)
  }
})

router.get('/allStudents', async(req,res,next) => {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents);
  } catch(err) {
    next(err)
  }
})


module.exports = router
