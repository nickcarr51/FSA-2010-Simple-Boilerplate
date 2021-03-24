import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent} from '../store'

class AllStudents extends React.Component {
  render() {
    return (
      <ul id='all-students'>
        {this.props.students.map((each) => {
          return (<li key={each.id}>
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
          </li>)
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStudents)
