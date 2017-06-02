import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#" onClick={() => props.clickNavigate('campuses')}>Margaret Hamilton Interplanetary Code School</a>
        </div>
        <ul className="nav navbar-nav">
          <li><a href="#" onClick={() => props.clickNavigate('campuses')}>Campuses</a></li>
          <li><a href="#" onClick={() => props.clickNavigate('students')}>Students</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar