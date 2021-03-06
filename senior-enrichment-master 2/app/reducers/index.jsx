import { combineReducers } from 'redux'
import { RECEIVE_CAMPUSES } from '../constants'
import { SELECT_CAMPUS } from '../constants'
import { CHANGE_VIEW } from '../constants'
import { RECEIVE_STUDENTS} from '../constants'
import { SELECT_STUDENT} from '../constants'
import { CREATE_CAMPUS } from '../constants'
import { DELETE_CAMPUS } from '../constants'
import { CREATE_STUDENT } from '../constants'
import store from '../store'
import update from 'immutability-helper';


let initialState = {
  campuses: [],
  selectedCampus : {},
  view : 'campuses', 
  students: [],
  selectedStudents: [],
  selectedStudent: {}
}

const rootReducer = function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case RECEIVE_CAMPUSES:
      newState.campuses = action.campuses;
      break;
    
    case SELECT_CAMPUS:
      newState.selectedCampus = action.selectedCampus
      break

    case CHANGE_VIEW:
      newState.view = action.view
      break
    
    case RECEIVE_STUDENTS:
      newState.students = action.students
      break

    case SELECT_STUDENT:
      newState.selectedStudent = action.selectedStudent
      break
    
    case CREATE_CAMPUS:
      newState.campuses = update(state, {campuses: {$push: [action.campus]}}).campuses
      break

    case CREATE_STUDENT:
      newState.students = update(state, {students: {$push: [action.student]}}).students
      "IM IN THE REDUCER"
      break
    
    case DELETE_CAMPUS:
      return update(state, {campuses: {$set: action.campuses}})

    default:
      return state;

  }

  return newState;

}


export default rootReducer
