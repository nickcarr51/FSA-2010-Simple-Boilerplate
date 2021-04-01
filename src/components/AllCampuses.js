import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus, deleteCampus, setVisibility, sortBy } from '../store'

class AllCampuses extends React.Component {
  render() {
    return (
      <div id='display'>
        <div id='view-controls'>
          <ul id='filters'>
            Filter by:
            <li onClick={()=>this.props.setVisibility('SHOW_ALL')}>All campuses</li>
            <li onClick={()=>this.props.setVisibility('SHOW_EMPTY_CAMPUSES')}>Campuses with no students</li>
          </ul>
          <ul id='sorting'>
            Sort by:
            <li onClick={()=>this.props.sortBy('BY_NUM_OF_STUDENTS')}>Number of students</li>
          </ul>
        </div>
        <ul id='all-campuses'>
          {this.props.campuses.map((each) => {
            return (
            <li
              key={each.id}
              style={{
              display: each.show === false && "none"
            }}>
              <div className='info'>
                <Link to={'/campuses/' + each.id} onClick={() => this.props.selectCampus(each.id)}>
                  <h3>{each.name}</h3>
                </Link>
                <br />
                Address: {each.address}
                <br />
                Description: {each.description}
              </div>
              <div className='graphic'>
                <img src={each.imageUrl} />
              </div>
              <button className='delete' onClick={() => this.props.deleteCampus(each)}>X</button>
            </li>)
          })}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    newCampus: state.newCampus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCampus: (selectedCampusId) => {
      return dispatch(selectCampus(selectedCampusId))
    },
    deleteCampus: (campus) => {
      return dispatch(deleteCampus(campus))
    },
    setVisibility: (text) => {
      return dispatch(setVisibility(text))
    },
    sortBy: (text) => {
      return dispatch(sortBy(text))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCampuses)
