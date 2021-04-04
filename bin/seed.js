#!/usr/bin/env node
const fs = require('fs')
const {db, Campus, Student} = require('../server/db')
const faker = require('faker')

const syncAndSeed = async() => {
  try {
    await db.sync({force: true})

    //Campus
    const gryffindor = await Campus.create({
      name: 'Gryffindor',
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraph()
    })

    const hufflepuff = await Campus.create({
      name: 'Hufflepuff',
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraph()
    })

    const ravenclaw = await Campus.create({
      name: 'Ravenclaw',
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraph()
    })

    const slytherin = await Campus.create({
      name: 'Slytherin',
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraph()
    })

    const dataArray = new Array(100);
    for (let i=0; i<dataArray.length; i++) {
      dataArray[i] = {
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        description: faker.lorem.paragraph()
      }
    }

    const createdCampus = await Campus.bulkCreate(dataArray);

    //Student
    const StudentOne = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 3.8,
      campusId: gryffindor.id
    })

    const StudentTwo = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 3.5,
      campusId: hufflepuff.id
    })

    const StudentThree = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 4.0,
      campusId: ravenclaw.id
    })

    const StudentFour = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 3.0,
      campusId: hufflepuff.id
    })

    const dataArrayStudent = new Array(100);
    for (let i=0; i<dataArrayStudent.length; i++) {
      dataArrayStudent[i] = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gpa: Math.floor(Math.random()*5),
        campusId: Math.floor(Math.random()*100)+1
      }
    }

    const createdStudents = await Student.bulkCreate(dataArrayStudent);

    // db.close()
    console.log(`
      Seeding successful!
    `)
} catch(err) {
    console.log(err)
  }
}

syncAndSeed()
