import update from 'immutability-helper';

import {
  RECEIVE_CAMPUSES, SELECT_CAMPUS, CREATE_CAMPUS, DELETE_CAMPUS, UPDATE_CAMPUS,
  RECEIVE_STUDENTS, SELECT_STUDENT, CREATE_STUDENT, UPDATE_STUDENT,
  CHANGE_VIEW, CHANGE_ADD_OR_EDIT
} from '../constants'

import store from '../store'



let initialState = {
  campuses: [],
  selectedCampus: {},
  students: [],
  selectedStudent: {},
  view: 'campuses',
  addOrEdit: ''
}

const rootReducer = function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {


    //campus actions
    case RECEIVE_CAMPUSES:
      newState.campuses = action.campuses;
      break;

    case SELECT_CAMPUS:
      newState.selectedCampus = action.selectedCampus
      break

    case CREATE_CAMPUS:
      newState.campuses = update(state, { campuses: { $push: [action.campus] } }).campuses
      break

    case DELETE_CAMPUS:
      return update(state, { campuses: { $set: action.campuses } })

     case UPDATE_CAMPUS:
      let oldCampus = store.getState().campuses.filter(campus => campus.id == action.campus.id)[0]
      let idx = store.getState().campuses.indexOf(oldCampus)
      return update(state,
        { campuses: { $splice: [[idx, 1]], $push: [action.campus] } })

    //student actions
    case RECEIVE_STUDENTS:
      newState.students = action.students
      break

    case SELECT_STUDENT:
      newState.selectedStudent = action.selectedStudent
      break

    case CREATE_STUDENT:
      newState.students = update(state, { students: { $push: [action.student] } }).students
      break

    case UPDATE_STUDENT:
      let students = store.getState().students
      let oldStudent = students.filter(student => student.id == action.student.id)[0]
      let ind = students.indexOf(oldStudent)
      return update(state,
        { students: { $splice: [[ind, 1]], $push: [action.student] } })

    //navigation actions
    case CHANGE_VIEW:
      newState.view = action.view
      break

    case CHANGE_ADD_OR_EDIT:
      newState.addOrEdit = action.addOrEdit
      break

    default:
      return state;

  }

  return newState;

}


export default rootReducer
