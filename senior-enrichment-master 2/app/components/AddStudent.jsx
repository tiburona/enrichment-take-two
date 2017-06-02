import React, { Component } from 'react'


export default class AddStudent extends Component {

    constructor(props) {
        super(props);

        let campusKey
        this.props.selectedCampus? campusKey = this.props.selectedCampus.id : campusKey = 1
        this.state = { campusKey: campusKey, name: '' }

        this.handleCampusChange = this.handleCampusChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleCampusChange(event) {
        this.setState({ campusKey: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        this.props.addStudent(this.state.name, this.state.campusKey, this.props.view)
        this.state.name = ''
        event.preventDefault();
    }

    render() {
        const campuses = this.props.campuses
        return (
            <div>
                <h3>Add a student</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        Campus:
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