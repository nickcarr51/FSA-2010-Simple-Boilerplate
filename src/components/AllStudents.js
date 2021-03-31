import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent,deleteStudent,setVisibility} from '../store'

class AllStudents extends React.Component {
  render() {
    return (
      <>
      <ul id='filters'>
        Filter by:
        <li onClick={()=>this.props.setVisibility('SHOW_ALL')}>All students</li>
        <li onClick={()=>this.props.setVisibility('SHOW_UNREGISTERED_STUDENTS')}>Unregistered students</li>
      </ul>
      <ul id='all-students'>
        {this.props.students.map((each) => {
          return (
          <li
            key={each.id}
            style={{
            display: each.show === false && "none"
          }}>
            <div className='info'>
              <Link to={'/students/'+each.id} onClick={() => this.props.selectStudent(each.id)}>
              Name: {each.firstName} {each.lastName}
              </Link>
              <br />
              Email: {each.email}
              <br />
              Gpa: {each.gpa}
            </div>
            <div className='graphic'>
              <img src={each.imageUrl} />
            </div>
            <button className='delete' onClick={() => this.props.deleteStudent(each)}>X</button>
          </li>)
        })}
      </ul>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    newStudent: state.newStudent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    },
    deleteStudent: (student) => {
      return dispatch(deleteStudent(student))
    },
    setVisibility: (text) => {
      return dispatch(setVisibility(text))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStudents)
