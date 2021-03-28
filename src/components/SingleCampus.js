import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent} from '../store'

class SingleCampus extends React.Component {
  render() {
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
            {selectedCampus.students !== undefined && selectedCampus.students.length > 0 ?
            selectedCampus.students.map(each => (
              <ul key={each.id}>
                <Link to={'/students/'+each.id} onClick={() => this.props.selectStudent(each.id)}>
                  <li>Name: {each.firstName} {each.lastName}</li>
                </Link>
                <li>Email: {each.email}</li>
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

const mapDispatchToProps = (dispatch) => {
  return {
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleCampus)
