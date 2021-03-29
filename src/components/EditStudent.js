import React from 'react'
import { connect } from 'react-redux'
import { selectStudent,updateStudent } from '../store'

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.selectedStudent ? props.selectedStudent.firstName : '',
      lastName: props.selectedStudent ? props.selectedStudent.lastName : '',
      email: props.selectedStudent ? props.selectedStudent.email : ''
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
    console.log({...this.props.selectedStudent, ...this.state});
    this.props.updateStudent({...this.props.selectedStudent, ...this.state});
  }

  render() {
    console.log(this.props);
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

const mapStateToProps = (state, {match}) => {
  const selectedStudentId = +match.params.studentId;
  return {
    selectedStudent: state.students.find((elem) => elem.id === selectedStudentId)
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    },
    updateStudent: (selectedStudent) => {
      return dispatch(updateStudent(selectedStudent,history))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditStudent)
