import React, { Component } from 'react'


export default class AddOrEditStudent extends Component {

    constructor(props) {
        super(props);
        console.log("ADD STUDENT PROPS", this.props)
        let campusKey

        "id" in this.props.selectedCampus ? campusKey = this.props.selectedCampus.id : campusKey = 1
        if (this.props.addOrEdit === 'add') {
            this.state = { campusKey: campusKey, name: '', email: '' }
            this.addOrEditFn = this.props.addStudent
        } else {
            this.state = { 
                campusKey: campusKey,
                name: this.props.selectedStudent.name,
                email: this.props.selectedStudent.email
            }
            this.addOrEditFn = this.props.editStudent
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
        this.addOrEditFn(
            {name: this.state.name,
             email: this.state.email,
             campusId: this.state.campusKey}
             , this.props.view)
        this.state.name = ''
        this.state.email = ''
        event.preventDefault();
    }

    render() {
        const campuses = this.props.campuses
        return (
            <div>
                <h3>Add a student</h3>
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