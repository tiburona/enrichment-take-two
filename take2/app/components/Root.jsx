import React, { Component } from 'react';
import axios from 'axios'

import Campuses from './Campuses';
import Campus from './Campus'
import Navbar from './Navbar';
import Students from './Students'
import AddCampus from './AddCampus'
import EditCampus from './EditCampus'
import AddOrEditStudent from './AddorEditStudent'

import store from '../store'

import {
    getCampuses, selectCampus, changeView, getStudents,
    createCampus, deleteStudent, deleteCampus, createStudent, selectStudent,
    changeAddOrEdit, updateStudent, updateCampus
} from '../action-creators'


export const inititialState = {
    campuses: [],
    selectedCampus: {},
    students: [],
    selectedStudent: {},
    view: 'campuses',
    addOrEdit: ''
}


export default class Root extends Component {

    constructor(props) {
        super(props)

        this.state = inititialState

        //Campus dispatchers
        this.addCampus = this.addCampus.bind(this)
        this.editCampus = this.editCampus.bind(this)
        this.removeCampus = this.removeCampus.bind(this)

        //Student dispatchers
        this.addStudent = this.addStudent.bind(this)
        this.editStudent = this.editStudent.bind(this)
        this.removeStudent = this.removeStudent.bind(this)

        //Navigation dispatchers
        this.clickCampus = this.clickCampus.bind(this)
        this.clickStudent = this.clickStudent.bind(this)
        this.clickNavigate = this.clickNavigate.bind(this)
        this.clickAddOrEdit = this.clickAddOrEdit.bind(this)
        

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

    //Campus dispatchers

    addCampus(name) {
        const creatingCampus = axios.post('/api/campus', { name: name })
            .then(res => {
                return res.data
            })
            .then(campus => store.dispatch(createCampus(campus)))
            .then(() => store.dispatch(changeView('campuses')))
            .catch(err => console.log(err))
    }

    editCampus(campus, view='campuses') {
        const updatingStudent = axios.put('/api/campus', campus)
            .then(res => {
                return res.data
            })
            .then(campus => {
                return store.dispatch(updateCampus(campus))
            })
            .then(() => { return store.dispatch(getCampuses()) })
            .then(() => { return store.dispatch(changeView(view)) })
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


    //Student dispatchers

    addStudent(student) {
        const creatingStudent = axios.post('/api/student', student)
            .then(res => {
                return res.data
            })
            .then(student => {
                return store.dispatch(createStudent(student))
            })
            .then(() => { return store.dispatch(getStudents()) })
            .then(() => { store.dispatch(changeView('students'))})
            .catch(err => console.log(err))
    }

    editStudent(student, view = 'students') {
        const updatingStudent = axios.put('/api/student', student)
            .then(res => {
                return res.data
            })
            .then(student => {
                return store.dispatch(updateStudent(student))
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
            .then(() => store.dispatch(changeView('students')))
            .catch(err => console.log(err))
    }

    //Navigation dispatchers

    clickCampus(id) {

        let students = store.getState().students.filter(student => student.campusId === id)
        let campus = store.getState().campuses.filter(campus => campus.id === id)[0]
        campus.students = students
        store.dispatch(selectCampus(campus))
        store.dispatch(changeAddOrEdit(''))
        store.dispatch(changeView('campus'))
    }


    clickStudent(id) {

        let student = store.getState().students.filter(student => student.id === id)[0]
        let campusId = student.campusId
        let campus = store.getState().campuses.filter(campus => campus.id === campusId)[0]
        student.campus = campus
        store.dispatch(selectStudent(student))
        store.dispatch(changeAddOrEdit(''))
        store.dispatch(changeView('student'))

    }

    clickNavigate(dest) {
        store.dispatch(changeView(dest))
        store.dispatch(changeAddOrEdit(''))
    }

    clickAddOrEdit(addOrEdit) {
        store.dispatch(changeAddOrEdit(addOrEdit))
        this.forceUpdate()
    }

    



    render() {

        let filteredStudents
        switch (this.state.view) {
            case 'campus':
                filteredStudents= this.state.selectedCampus.students
                break
            case 'student':
                filteredStudents=[this.state.selectedStudent]
                break
            default:
                filteredStudents = this.state.students
        }

        let students = <Students
            filteredStudents={filteredStudents}
            clickCampus={this.clickCampus}
            clickStudent={this.clickStudent}
            view={this.state.view}
            deleteStudent={this.removeStudent}
            clickAddOrEdit={this.clickAddOrEdit} />

        let addOrEditForm
        
        if (this.state.addOrEdit.length) {
             addOrEditForm =
            <AddOrEditStudent
                campuses={this.state.campuses}
                addOrEdit={this.state.addOrEdit}
                addStudent={this.addStudent}
                editStudent={this.editStudent}
                selectedCampus = {this.state.selectedCampus}
                selectedStudent = {this.state.selectedStudent} />

        } else {
            addOrEditForm = <div/>
        }

        let toRender

        switch (this.state.view) {

            case 'campuses':
                toRender =
                    <div>
                        <div className='row' >
                            <Campuses 
                                campuses={this.state.campuses} 
                                clickCampus={this.clickCampus} 
                                deleteCampus={this.removeCampus} />
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
                        {students}
                        {addOrEditForm}
                        <EditCampus 
                            selectedCampus={this.state.selectedCampus}
                            editCampus={this.editCampus}
                        />
                    </div>
                break

            default:
                toRender =
                    <div>
                        {students}
                        {addOrEditForm}
                    </div>
        }

        return (
            <div id="root" className="container-fluid">
                <Navbar clickNavigate={this.clickNavigate} />
                {toRender}
            </div>
        )
    }
}



