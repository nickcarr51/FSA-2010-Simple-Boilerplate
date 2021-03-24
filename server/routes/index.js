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

router.get('/campuses/:campusId', async(req,res,next) => {
    try {
      const selectedCampus = await Campus.findAll({
        include: [Student],
        where: {
          id: req.params.campusId
        }
      })
      res.send(selectedCampus);
    } catch(err) {
      next(err)
    }
})

router.get('/allStudents', async(req,res,next) => {
  try {
    const allStudents = await Student.findAll({
      include: [Campus]
    });
    res.send(allStudents);
  } catch(err) {
    next(err)
  }
})

router.get('/students/:studentId', async(req,res,next) => {
  try {
    const selectedStudent = await Student.findAll({
      include: [Campus],
      where: {
        id: req.params.studentId
      }
    })
    res.send(selectedStudent);
  } catch(err) {
    next(err)
  }
})

module.exports = router
