import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus, deleteCampus, setVisibility, sortBy } from '../store'

class AllCampuses extends React.Component {
  render() {
    return (
      <div id='display'>
        <div className='view-controls'>
            <h3>Filter by</h3>
          <ul className='filters'>
            <li onClick={()=>this.props.setVisibility('SHOW_ALL')} className={this.props.visibilityFilter === 'SHOW_ALL'? 'active' : undefined}>All campuses</li>
            <li onClick={()=>this.props.setVisibility('SHOW_EMPTY_CAMPUSES')} className={this.props.visibilityFilter === 'SHOW_EMPTY_CAMPUSES'? 'active' : undefined}>Campuses with no students</li>
          </ul>
            <h3>Sort by</h3>
          <ul className='sorting'>
            <li onClick={()=>this.props.sortBy('BY_NUM_OF_STUDENTS')} className={this.props.sortBy === 'BY_NUM_OF_STUDENTS' ? 'active' : undefined}>Number of students</li>
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
                <h4>🧭 Address</h4>
                <p>{each.address}</p>
                <h4>💬 Description</h4>
                <p>{each.description}</p>
                <div className='graphic'>
                  <img src={each.imageUrl} />
                </div>
                </Link>
              </div>
                <button className='delete' onClick={() => this.props.deleteCampus(each)}>Delete</button>
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
    newCampus: state.newCampus,
    visibilityFilter: state.visibilityFilter,
    sortBy: state.sortBy
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
