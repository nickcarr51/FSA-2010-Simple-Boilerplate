import React from 'react'
import { connect } from 'react-redux'

class AllCampuses extends React.Component {
  render() {
    return (
      <ul id='all-campuses'>
        {this.props.campuses.map((each) => {
          return (<li>
            <div className='info'>
              Campus: {each.name}
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
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(AllCampuses)
