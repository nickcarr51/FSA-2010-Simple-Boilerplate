import React from 'react'
import { connect } from 'react-redux'
import { selectStudent,updateStudent } from '../store'

class EditCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log('clicked submit!');
  }

  render() {
    console.log(this.state);
    return (
      <div id='edit-student'>
         <form onSubmit={this.handleSubmit}>
          <label htmlFor='firstName'>Firstname:</label>
          <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} />
          <label htmlFor='lastName'>Lastname:</label>
          <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange} />
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' value={this.state.email} pattern=".+@hogwarts.com" required onChange={this.handleChange} />
          <button type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

export default EditCampus
