const utils = require('../../utils')

import { navigatePage } from '../store'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Pagination extends React.Component {

  render() {
    let paginationLength = 0;
    if (this.props.location.pathname.includes('campuses')) {
      paginationLength = this.props.campuses.length
    } else if (this.props.location.pathname.includes('students')) {
      paginationLength = this.props.students.length
    }

    return (
      <ul id='pagination'>
        {/* make it dynamic later if time allows */}
        {utils.paginationArray(Math.floor(paginationLength / 10)+1).map((each) => {
          return (
          <Link to={`/${this.props.location.pathname.includes('campuses')? 'campuses':'students'}?page=${each}`} key={each}>
            <li
            onClick={() => this.props.navigatePage(each, this.props.location.pathname.includes('campuses')? 'campuses':'students')}
            className={this.props.location.search.slice(this.props.location.search.indexOf('=')+1)*1 === each ? 'current' : undefined}
            >
              {each}
            </li>
          </Link>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
    visibilityFilter: state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigatePage: (pageId,pageType) => {
      return dispatch(navigatePage(pageId,pageType))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Pagination)
