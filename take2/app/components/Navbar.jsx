import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Margaret Hamilton Interplanetary Code School</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#" onClick={() => props.clickNavigate('campuses')}>Home</a></li>
          <li><a href="#" onClick={() => props.clickNavigate('students')}>Students</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar