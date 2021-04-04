const router = require('express').Router()
const {db, Campus, Student} = require('../../server/db')

router.get('/allCampuses', async(req,res,next) => {
  try {
    const allCampuses = await Campus.findAll({
      include: [Student]
    });
    res.send(allCampuses);
  } catch(err) {
    next(err)
  }
})

router.get('/campuses', async(req,res,next) => {
  try {
    const query = req.query.page
    if (query !== undefined) {
      const campusesOnPage = await Campus.findAndCountAll({
        include: [Student],
        offset: (query*1 - 1) * 10,
        limit: 10
      })
      res.send(campusesOnPage);
    } else {
      res.sendStatus(400);
    }
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

router.get('/students', async(req,res,next) => {
  try {
    const query = req.query.page
    if (query !== undefined) {
      const studentsOnPage = await Student.findAndCountAll({
        include: [Campus],
        offset: (query*1 - 1) * 10,
        limit: 10
      })
      res.send(studentsOnPage);
    } else {
      res.sendStatus(400);
    }
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

router.put('/campuses/:campusId', async(req,res,next) => {
  try {
    const campusToUpdate = await Campus.findByPk(req.params.campusId);
    await campusToUpdate.update(req.body);
    res.send(campusToUpdate);
  } catch(err) {
    next(err)
  }
})

router.put('/students/:studentId', async(req,res,next) => {
  try {
    const studentToUpdate = await Student.findByPk(req.params.studentId);
    await studentToUpdate.update(req.body);
    res.send(studentToUpdate);
  } catch(err) {
    next(err)
  }
})

module.exports = router
