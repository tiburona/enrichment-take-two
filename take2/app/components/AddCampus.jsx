import React, { Component } from 'react'


export default class AddCampus extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '', imgSrc: '' }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleImgChange(event) {
        this.setState({ imgSrc: event.target.value })
    }

    handleSubmit(event) {
        this.props.addCampus(this.state.name, this.state.imgSrc)
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
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Image Source:
          <input type="text" value={this.state.imgSrc} onChange={this.handleImgChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
            
    
        )
    }
}