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

    //Student
    const StudentOne = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      // email: `${StudentOne.firstName}@hogwarts.com`,
      gpa: 3.8
    })

    const StudentTwo = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 3.5
    })

    const StudentThree = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 4.0
    })

    const StudentFour = await Student.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      gpa: 3.0
    })

    // db.close()
    console.log(`
      Seeding successful!
    `)
} catch(err) {
    console.log(err)
  }
}

syncAndSeed()
