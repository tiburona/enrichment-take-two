'use strict'
const api = require('express').Router()
const db = require('../db')
const models = require('../db/models');
const Student = models.Student
const Campus = models.Campus


//get routes

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


//post routes

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
        email: req.body.email,
        campusId: req.body.campusId
    })
    .then(student => {
        return Student.findOne(
            {where: {id:student.id}, include: [Campus] }
        )
    })
    .then(student => {
        res.status(201).send(student)})
    .catch(err=>console.log(err))
})

//delete routes

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

//put routes

api.put('/student', (req, res, next) => {
    Student.update({
        name: req.body.name,
        email: req.body.email,
        campusId: req.body.campusId
    })
    .then(campus => res.status(201).send(campus))
    .catch(err=>console.log(err))
})

api.put('/student', (req, res, next) => {
    Campus.update({
        name: req.body.name,
        imgSrc: req.body.imgSrc
    })
    .then(campus => res.status(201).send(campus))
    .catch(err=>console.log(err))
})



module.exports = api