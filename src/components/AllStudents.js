import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent,deleteStudent,setVisibility,sortBy} from '../store'

class AllStudents extends React.Component {
  render() {
    return (
      <div id='display'>
        <div className='view-controls'>
          <h3>Filter by</h3>
            <ul className='filters'>
              <li onClick={()=>this.props.setVisibility('SHOW_ALL')} className={this.props.visibilityFilter === 'SHOW_ALL'? 'active' : undefined}>All students</li>
              <li onClick={()=>this.props.setVisibility('SHOW_UNREGISTERED_STUDENTS')} className={this.props.visibilityFilter === 'SHOW_UNREGISTERED_STUDENTS'? 'active' : undefined}>Unregistered students</li>
            </ul>
          <h3>Sort by</h3>
            <ul className='sorting'>
              <li onClick={()=>this.props.sortBy('BY_LASTNAME')} className={this.props.sortBy === 'BY_LASTNAME' ? 'active':undefined}>Lastname</li>
              <li onClick={()=>this.props.sortBy('BY_GPA')} className={this.props.sortBy === 'BY_GPA' ? 'active':undefined}>GPA</li>
            </ul>
        </div>
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
                <h3> 🎓 {each.firstName} {each.lastName}</h3>
                </Link>
                <h4>Email</h4>
                <p>{each.email}</p>
                <h4>GPA</h4>
                <p>{each.gpa}</p>
              </div>
              <div className='graphic'>
                <img src={each.imageUrl} />
              </div>
              <button className='delete' onClick={() => this.props.deleteStudent(each)}>Delete</button>
            </li>)
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    newStudent: state.newStudent,
    visibilityFilter: state.visibilityFilter,
    sortBy: state.sortBy
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
    },
    sortBy: (text) => {
      return dispatch(sortBy(text))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStudents)
