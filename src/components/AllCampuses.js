import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus } from '../store'

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
          </li>)
        })}
      </ul>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCampus: (selectedCampusId) => {
      return dispatch(selectCampus(selectedCampusId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCampuses)
