
import { RECEIVE_CAMPUSES, SELECT_CAMPUS, CHANGE_VIEW, RECEIVE_STUDENTS,
SELECT_STUDENT, CREATE_CAMPUS, DELETE_CAMPUS, DELETE_STUDENT, 
CREATE_STUDENT } from '../constants'

import axios from 'axios';


//campus action creators

export const getCampuses = () => {
   return dispatch => {
    axios.get('/api/campuses')
      .then(response => {
        dispatch(receiveCampuses(response.data));
      });
  }
};


export const receiveCampuses = campuses => {
    return {type: RECEIVE_CAMPUSES, campuses: campuses}
};

export const selectCampus = campus => {
  return {type: SELECT_CAMPUS, selectedCampus: campus}
}

export const createCampus = campus => {
  return {type: CREATE_CAMPUS, campus: campus}
}

export const deleteCampus = campuses => {
  return {type: DELETE_CAMPUS, campuses: campuses}
}


//student action creators

export const getStudents = () => {
   return dispatch => {
    axios.get('/api/students')
      .then(response => {
        return dispatch(receiveStudents(response.data));
      });
  }
};
export const receiveStudents = students => {
    return {type: RECEIVE_STUDENTS,
    students: students}
};

export const selectStudent = student => {
    return {type: SELECT_STUDENT, selectedStudent: student}
};

export const createStudent = student => {
  return {type: CREATE_STUDENT, student: student}
}

export const deleteStudent = students => {
  return {type: DELETE_STUDENT, students: students}
}

//change view

export const changeView = view => {
  return {type: CHANGE_VIEW, view: view}
}





