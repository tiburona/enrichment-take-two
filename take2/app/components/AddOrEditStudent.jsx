import React, { Component } from 'react'
import store from '../store'
import { changeAddOrEdit } from '../action-creators'

export default class AddOrEditStudent extends Component {

    constructor(props) {
        super(props);
        let campusKey

        "id" in this.props.selectedCampus ? campusKey = this.props.selectedCampus.id : campusKey = 1
        if (this.props.addOrEdit === 'add') {
            this.state = { campusKey: campusKey, name: '', email: '' }
            this.addOrEditFn = this.props.addStudent
            this.title = "Add a Student"
        } else {
            this.state = {
                campusKey: campusKey,
                name: this.props.selectedStudent.name,
                email: this.props.selectedStudent.email,
                id: this.props.selectedStudent.id
            }
            this.addOrEditFn = this.props.editStudent
            this.title = "Edit a Student"
        }

        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCampusChange(event) {
        this.setState({ campusKey: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleSubmit(event) {
        let arg = {
            name: this.state.name,
            email: this.state.email,
            campusId: this.state.campusKey
        }

        if (this.props.addOrEdit === 'edit') {
            arg.id = this.state.id
        }
            
        this.addOrEditFn(arg)
        this.state.name = ''
        this.state.email = ''
        store.dispatch(changeAddOrEdit(''))
        event.preventDefault();
    }

    render() {
        const campuses = this.props.campuses
        return (
            <div>
                <h3>{this.title}</h3>
                <form onSubmit={this.handleSubmit}>
                    <label> Name:
                         <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label> Email:
                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    </label>
                    <label> Campus:
                        <select value={this.state.campusKey} onChange={this.handleCampusChange}>
                            {campuses && campuses.map(campus => {
                                return <option key={campus.id} value={campus.id}>{campus.name}</option>
                            })}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        )
    }
}