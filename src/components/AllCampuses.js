import React from 'react'
import { connect } from 'react-redux'

class AllCampuses extends React.Component {
  render() {
    return (
      <ul id='all-campuses'>
        {this.props.categories.map((each) => {
          return (<li>
            Campus: {each.name}
            <br />
            Address: {each.address}
            <br />
            <img src={each.imageUrl} />
          </li>)
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.campuses
  }
}

export default connect(mapStateToProps)(AllCampuses)
