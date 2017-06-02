// - Navigation: as a user I...
//   * will land on **Home** by default
//   * can navigate to **Campuses** from **Home**
//   * can navigate to **Students** from **Home**
//   * can navigate to view a **Single Campus** from **Campuses**
//   * can navigate to view a **Single Student** from **Students**
//   * can navigate to view a **Single Student** from **Single Campus** (for any student at that campus)
//   * can navigate to view that student's **Single Campus** from **Single Student**

// - Views: as a user I...
//   * see a list of all campuses on the **Campuses** view
//   * see a list of all students on the **Students** view
//   * see details about a campus on the **Single Campus** view, including that campus's students
//   * see details about a student on the **Single Student** view, including that student's campus

// - Actions: as a user I...
//   * can create a campus
//   * can edit a campus's info, including adding/removing a student to/from that campus
//   * can delete a campus
//   * can create a student
//   * can edit a student's info, including the campus that student is assigned to
//   * can delete a student


export const RECEIVE_CAMPUSES = 'RECEIVE_CAMPUSES'
export const CREATE_CAMPUS = 'CREATE_CAMPUS'
export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS'
export const SELECT_CAMPUS = 'SELECT_CAMPUS'
export const SELECT_STUDENT = 'SELECT_STUDENT'
export const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
export const CREATE_STUDENT = 'CREATE_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const CHANGE_VIEW = 'CHANGE_VIEW'
export const DELETE_CAMPUS = 'DELETE_STUDENT'