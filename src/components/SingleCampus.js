import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent,updateCampus,unregisterStudent} from '../store'

class SingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: props.selectedCampus && props.selectedCampus.students ? props.selectedCampus.students : []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    let studentToUnregister = this.state.students.filter((elem) => {return elem.id*1 === ev.target.value*1});
    // console.log({...studentToUnregister[0], campusId: null});
    let updatedStudents = this.state.students.filter((elem) => { return elem.id*1 !== ev.target.value*1});
    // console.log({...this.props.selectedCampus, students: updatedStudents})
    this.props.unregisterStudent({...studentToUnregister[0], campusId: null})
    this.props.updateCampus({...this.props.selectedCampus, students: updatedStudents})
  }

  render() {
    console.log(this.props);
    if (this.props.selectedCampus) {
      const selectedCampus = this.props.selectedCampus;
      return (
        <div id='single-campus'>
          <div className='single-campus-info'>
            <h2>{selectedCampus.name}</h2>
            Address: {selectedCampus.address}
            <br />
            Description: {selectedCampus.description}
            <br />
            <img src={selectedCampus.imageUrl} />
          </div>
          <div className='student-list'>
            <h2>Student List</h2>
            {selectedCampus.students && selectedCampus.students.length > 0 ?
            selectedCampus.students.map(each => (
              <ul key={each.id}>
                <Link to={'/students/'+each.id} onClick={() => this.props.selectStudent(each.id)}>
                  <li>Name: {each.firstName} {each.lastName}</li>
                </Link>
                <li>Email: {each.email}</li>
                <button value={each.id} onClick={this.handleClick}>Unregister</button>
              </ul>
            ))
            :
            (<p>This campus does not have any students associated!</p>)}
          </div>
        </div>
      )
    } else {
      return 'Reselect a campus!'
    }
  }
}

const mapStateToProps = (state, {match}) => {
  const selectedCampusId = match.params.campusId*1;
  return {
    selectedCampus: state.campuses.find((elem) => elem.id === selectedCampusId)
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    },
    updateCampus: (selectedCampus) => {
      return dispatch(updateCampus(selectedCampus, history))
    },
    unregisterStudent: (selectedStudent) => {
      return dispatch(unregisterStudent(selectedStudent))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleCampus)
