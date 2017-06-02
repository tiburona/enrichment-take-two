'use strict'
const api = require('express').Router()
const db = require('../db')
const models = require('../db/models');
const Student = models.Student
const Campus = models.Campus

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))



api.get('/students', (req, res, next) => {
    Student.findAll({
        include: [Campus]
    })
    .then((students) => {
        res.json(students)    
    })
    .catch(err => console.log(err))
})

api.get('/students/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(student => res.json(student))
    .catch(err => console.log(err))
})

api.get('/students/campus/:campusId', (req, res, next) => {
    Student.findAll({
        where: {
            campusId: req.params.campusId
        }
    })
    .then(students => {
        console.log("students ", students)
        res.json(students)})
    .catch(err => console.log(err))
})


api.get('/campuses', (req, res, next) => {
    Campus.findAll({
        include: [Student]
    })
    .then((campuses) => {
        res.json(campuses)    
    })
    .catch(err => console.log(err))
})

api.get('/campuses/:campusId', (req, res, next) => {
	Campus.findOne({
		where: {
			id: req.params.campusId
		}
	})
	.then(campus => {
		res.json(campus)
	})
	.catch(err => console.log(err))
})

api.post('/campus', (req, res, next) => {
    Campus.create({
        name: req.body.name
    })
    .then(campus => res.status(201).send(campus))
    .catch(err=> console.log(err))
})

api.post('/student', (req, res, next ) => {
    Student.create({
        name: req.body.name,
        campusId: req.body.campusId
    })
    .then(student => {
        console.log("student id is ", student.id)
        return Student.findOne(
            {where: {id:student.id}, include: [Campus] }
        )
    })
    .then(student => {
        console.log("student is ", student)
        res.status(201).send(student)})
    .catch(err=>console.log(err))
})

api.delete('/campus/:id', (req, res, next) => {
    Campus.destroy({
        where: {id: req.params.id}
    })
    .then(res.status(204).send())
    .catch(err=>console.log(err))
})


api.delete('/student/:id', (req, res, next) => {
    Student.destroy({
        where: {id: req.params.id}
    })
    .then(res.status(204).send())
    .catch(err=>console.log(err))
})



module.exports = api