// This file should contain all the record creation needed to seed the database with its default values.
// The data can then be loaded with the node seed.js

const Promise = require('bluebird');
const db = require('.');
const models = require('./models')
const Campus = require('./models/campus');
const Student = require('./models/student');

Student.belongsTo(Campus)

const data = {
  student1: [
    {name: "Katie", campus: {name: "Terra"}},
    {name: "Lara", campus: {name: "Venus"}},
    {name: "Michelle", campus: {name: "Luna"}},
    {name: "Nancy", campus: {name: "Mars"}}
  ],

  student2: [
    {name: "Anne", campusId: 1},
    {name: "Felicia", campusId: 2},
    {name: "Sara", campusId: 3},
    {name: "Kang", campusId: 4}
  ]
};

db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const creatingStudents = data.student1.map(function (student) {
    return Student.create(student, { include: [Campus] });
  })
  return Promise.all([creatingStudents])
})
.then( function () {
  const addingStudents = data.student2.map(function (student) {
    return Student.create(student)
  })
  return Promise.all([addingStudents])
})
.then(function () {
  console.log("Finished inserting data (press ctrl-c to exit)");
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
});

