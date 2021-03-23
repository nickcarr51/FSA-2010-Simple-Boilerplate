import React from 'react'
import { connect } from 'react-redux'

class AllStudents extends React.Component {
  render() {
    return (
      <ul id='all-students'>
        {this.props.students.map((each) => {
          return (<li>
            <div className='info'>
              First Name: {each.firstName}
              <br />
              Last Name: {each.lastName}
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

export default connect(mapStateToProps)(AllStudents)
