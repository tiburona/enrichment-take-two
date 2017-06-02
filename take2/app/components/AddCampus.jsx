import React, { Component } from 'react'


export default class AddCampus extends Component {

    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        this.props.addCampus(this.state.value)
        this.state.value = ''
        event.preventDefault();
    }

    render() {
        return (
 
            <div>
            <h3>Add a campus</h3>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
            
    
        )
    }
}