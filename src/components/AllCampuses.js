import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCampus, deleteCampus, setVisibility, sortBy, navigatePage, fetchCampuses } from '../store'

class AllCampuses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: props.campuses.length > 0? props.campuses : [],
      campusesOnPage: props.campusesOnPage.length > 0? props.campusesOnPage : []
    }
  }

  async componentDidMount() {
    const query = this.props.history.location.search;

    if (query.length === 0) {
      const campusesOnPage = (await axios.get(`/api/campuses?page=1`)).data;
      this.setState({
        campusesOnPage: campusesOnPage.rows
      })
    } else if (query.length > 0) {
      const pageId = query.slice(query.indexOf('=')+1);
      const campusesOnPage = (await axios.get(`/api/campuses?page=${pageId}`)).data;
      this.setState({
        campusesOnPage: campusesOnPage.rows
      })
    }
  }

  render() {
    const campusesOnPage = this.props.campusesOnPage.length > 0 ? this.props.campusesOnPage : this.state.campusesOnPage;

    return (
      <div id='display'>
        <div className='view-controls'>
            <h3>Filter by</h3>
          <ul className='filters'>
            <li onClick={()=>this.props.fetchCampuses()} className={this.props.visibilityFilter === 'SHOW_ALL'? 'active' : undefined}>All campuses</li>
            <li onClick={()=>this.props.setVisibility('SHOW_EMPTY_CAMPUSES')} className={this.props.visibilityFilter === 'SHOW_EMPTY_CAMPUSES'? 'active' : undefined}>Campuses with no students</li>
          </ul>
            <h3>Sort by</h3>
          <ul className='sorting'>
            <li onClick={()=>this.props.sortBy('BY_NUM_OF_STUDENTS')} className={this.props.sortFilter === 'BY_NUM_OF_STUDENTS'? 'active' : undefined}>Number of students</li>
          </ul>
        </div>
        <ul id='all-campuses'>
          {campusesOnPage.map((each) => {
            return (
            <li
              key={each.id}
            //   style={{
            //   display: each.show === false && "none"
            // }}
            >
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
    sortFilter: state.sortFilter,
    campusesOnPage: state.campusesOnPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
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
    },
    navigatePage: (pageId,pageType) => {
      return dispatch(navigatePage(pageId,pageType))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCampuses)
