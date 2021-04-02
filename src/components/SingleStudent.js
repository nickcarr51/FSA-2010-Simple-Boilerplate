import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus } from '../store'

class SingleStudent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.selectedStudent)
    if (this.props.selectedStudent) {
      const selectedStudent = this.props.selectedStudent
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
            <h3>Campus List</h3>
            {selectedStudent.campus?
            <ul>
            <Link to={'/campuses/'+selectedStudent.campus.id} onClick={() => this.props.selectCampus(selectedStudent.campus.id)}>
              <li>Campus: {selectedStudent.campus.name}</li>
            </Link>
            <li>Address: {selectedStudent.campus.address}</li>
            <li>Description: {selectedStudent.campus.description}</li>
            </ul>
            :
            <ul>
            <li>No Campus associated!</li>
            </ul>}
          </div>
        </div>
      )
    } else {
      return (
        <div id='display'>
          <div id='error'>
            <h3>Oops..🥺 Something went wrong...</h3>
            <p>The student you are trying to view doesn't exist. <br/> Please reselect a student.</p>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state,{match}) => {
  const selectedStudentId = +match.params.studentId;
  return {
    selectedStudent: state.students.find((elem) => elem.id === selectedStudentId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCampus: (selectedCampusId) => {
      return dispatch(selectCampus(selectedCampusId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleStudent)
