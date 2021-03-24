import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SingleStudent extends React.Component {
  render() {
    console.log(this.props.selectedStudent)
    if (this.props.selectedStudent.length > 0) {
      const selectedStudent = this.props.selectedStudent[0]
      return (
        <div id='single-student'>
          <div>
            <h2>{selectedStudent.firstName} {selectedStudent.lastName}</h2>
            <img src={selectedStudent.imageUrl} />
            <br />
            Email: {selectedStudent.email}
            <br />
            Gpa: {selectedStudent.gpa}
          </div>
          <div>
            <ul>
            <Link to={'/campuses/'+selectedStudent.campus.id} >
              <li>Campus: {selectedStudent.campus.name}</li>
            </Link>
            <li>Address: {selectedStudent.campus.address}</li>
            <li>Description: {selectedStudent.campus.description}</li>
            </ul>
          </div>
        </div>
      )
    } else {
      return 'Reselect the student!'
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.selectedStudent
  }
}

export default connect(mapStateToProps)(SingleStudent)
