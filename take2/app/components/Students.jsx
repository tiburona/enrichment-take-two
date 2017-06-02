import React from 'react'

const Students = (props) => {
    const students = props.filteredStudents
    const selectStudent = props.clickStudent
    const deleteStudent = props.deleteStudent
    const selectCampus = props.clickCampus
    const view = props.view

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Campus</th>
                </tr>
            </thead>
            <tbody>
                {students && students.map((student, idx) => {
                    let campusName
                    student.campus ? campusName = student.campus.name : campusName = 'no campus'
                    return <tr key={idx} >
                        <td>
                            <a href='#' onClick={() => selectStudent(student.id)}>{student.name}</a>
                        </td>
                         <td>
                            <a href='#' onClick={() => selectStudent(student.id)}>{student.email}</a>
                        </td>
                        <td>
                            <a href='#' onClick={() => selectCampus(student.campus.id)}>{campusName}</a>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-xs" onClick={() => { deleteStudent(student.id, view) }}>
                                <span className="glyphicon glyphicon-trash"> Delete</span>
                            </button>
                        </td>
                        <td>
                        </td>
                    </tr>
                })
                }
            </tbody>
        </table>
    )
}

export default Students

