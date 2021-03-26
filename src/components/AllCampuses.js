import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus, deleteCampus } from '../store'

class AllCampuses extends React.Component {
  render() {
    return (
      <ul id='all-campuses'>
        {this.props.campuses.map((each) => {
          return (<li key={each.id}>
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
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCampuses)
