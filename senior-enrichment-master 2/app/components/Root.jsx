import React, { Component } from 'react';
import axios from 'axios'

import Campuses from './Campuses';
import Campus from './Campus'
import Navbar from './Navbar';
import Students from './Students'
import AddCampus from './AddCampus'
import AddStudent from './AddStudent'

import store from '../store'

import {
    getCampuses, selectCampus, changeView, getStudents,
    createCampus, deleteStudent, deleteCampus, createStudent, selectStudent
} from '../action-creators'


export const inititialState = {
    campuses: [],
    view: 'campuses',
    selectedCampus: {},
    students: []
}


export default class Root extends Component {

    constructor(props) {
        super(props)

        this.state = inititialState

        this.clickCampus = this.clickCampus.bind(this)
        this.clickNavigate = this.clickNavigate.bind(this)
        this.clickStudent = this.clickStudent.bind(this)
        this.addCampus = this.addCampus.bind(this)
        this.removeCampus = this.removeCampus.bind(this)
        this.removeStudent = this.removeStudent.bind(this)

    }


    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
        store.dispatch(changeView('campuses'))
        store.dispatch(getCampuses())
        store.dispatch(getStudents())

    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    addCampus(name) {
        const creatingCampus = axios.post('/api/campus', { name: name })
            .then(res => {
                return res.data
            })
            .then(campus => store.dispatch(createCampus(campus)))
            .then(() => store.dispatch(changeView('campuses')))
            .catch(err => console.log(err))
    }

    removeCampus(id) {
        const deletingCampus = axios.delete(`/api/campus/${id}`)
            .then(() => {
                let campuses = store.getState().campuses
                let ind
                campuses.forEach((campus, idx) => {
                    if (campus.id === id) ind = idx
                })
                return campuses.slice(0, ind).concat(campuses.slice(ind + 1))
            })
            .then(campuses => store.dispatch(deleteCampus(campuses)))
            .then(() => store.dispatch(changeView('campuses')))
            .catch(err => console.log(err))
    }

    addStudent(name, campusId = undefined, view = 'students') {
        const creatingStudent = axios.post('/api/student', { name: name, campusId: campusId })
            .then(res => {
                return res.data
            })
            .then(student => {
                return store.dispatch(createStudent(student))
            })
            .then(() => { return store.dispatch(getStudents()) })
            .then(() => { return store.dispatch(changeView(view)) })
            .catch(err => console.log(err))
    }

    removeStudent(id, view) {
        axios.delete(`/api/student/${id}`)
            .then(() => {
                return store.dispatch(getStudents())
            })
            .then(() => store.dispatch(changeView(view)))
            .catch(err => console.log(err))
    }


    clickCampus(id) {

        let students = store.getState().students.filter(student => student.campusId === id)
        let campus = store.getState().campuses.filter(campus => campus.id === id)[0]
        campus.students = students
        store.dispatch(selectCampus(campus))
        store.dispatch(changeView('campus'))
    }


    clickStudent(id) {

        let student = store.getState().students.filter(student => student.id === id)[0]
        let campusId = student.campusId
        let campus = store.getState().campuses.filter(campus => campus.id === campusId)[0]
        student.campus = campus
        store.dispatch(selectStudent(student))
        store.dispatch(changeView('student'))

    }

    clickNavigate(dest) {
        store.dispatch(changeView(dest))
    }

    render() {

        let toRender

        switch (this.state.view) {

            case 'campuses':
                toRender =
                    <div>
                        <div className='row' >
                            <Campuses campuses={this.state.campuses} clickCampus={this.clickCampus} deleteCampus={this.removeCampus} />
                        </div>
                        <div className='row' >
                            <AddCampus addCampus={this.addCampus} />
                        </div>
                    </div>
                break

            case 'campus':
                toRender =
                    <div>
                        <Campus selectedCampus={this.state.selectedCampus} />
                        <Students filteredStudents={this.state.selectedCampus.students} clickCampus={this.clickCampus}
                            clickStudent={this.clickStudent} view={this.state.view} deleteStudent={this.removeStudent} />
                        <AddStudent campuses={this.state.campuses} addStudent={this.addStudent}
                            selectedCampus={this.state.selectedCampus} />
                    </div>
                break

            case 'students':
                toRender =
                    <div>
                        <Students filteredStudents={this.state.students} view={this.state.view} deleteStudent={this.removeStudent}
                            clickStudent={this.clickStudent} clickCampus={this.clickCampus} />
                        <AddStudent campuses={this.state.campuses} addStudent={this.addStudent} />
                    </div>
                break

            case 'student':
                toRender = <Students filteredStudents={[this.state.selectedStudent]} clickCampus={this.clickCampus}
                    clickStudent={this.clickStudent} view={this.state.view} deleteStudent={this.removeStudent} />
                break
        }

        return (
            <div id="root" className="container-fluid">
                <Navbar clickNavigate={this.clickNavigate} />
                {toRender}
            </div>
        )
    }
}



