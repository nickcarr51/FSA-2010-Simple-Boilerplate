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

router.post('/campuses/new',async(req,res,next) => {
  try {
    const newCampus = await Campus.create(req.body);
    res.send(newCampus);
  } catch(err) {
    next(err)
  }
})

router.post('/students/new', async(req,res,next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.send(newStudent);
  } catch(err) {
    next(err)
  }
})

router.delete('/campuses/:campusId', async(req, res, next) => {
  try {
    const campusToDelete = await Campus.findByPk(req.params.campusId);
    await campusToDelete.destroy();
    res.send(campusToDelete);
  } catch(err) {
    next(err)
  }
})

router.delete('/students/:studentId', async(req, res, next) => {
  try {
    const studentToDelete = await Student.findByPk(req.params.studentId);
    await studentToDelete.destroy();
    res.send(studentToDelete);
  } catch(err) {
    next(err)
  }
})

module.exports = router
