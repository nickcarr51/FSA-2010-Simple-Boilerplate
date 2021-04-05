import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectStudent,deleteStudent,setVisibility,sortBy,navigatePage,fetchStudents} from '../store'

class AllStudents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: props.students.length > 0? props.students : [],
      studentsOnPage: props.studentsOnPage.length > 0? props.studentsOnPage : []
    }
  }

  async componentDidMount() {
    // this.props.navigatePage(1,'students');
    const query = this.props.history.location.search;

    if (query.length === 0) {
      const studentsOnPage = (await axios.get(`/api/students?page=1`)).data;
      this.setState({
        studentsOnPage: studentsOnPage.rows
      })
    } else if (query.length > 0) {
      const pageId = query.slice(query.indexOf('=')+1);
      const studentsOnPage = (await axios.get(`/api/students?page=${pageId}`)).data;
      this.setState({
        studentsOnPage: studentsOnPage.rows
      })
    }
  }

  render() {

    const studentsOnPage = this.props.studentsOnPage.length > 0 ? this.props.studentsOnPage : this.state.studentsOnPage;

    return (
      <div id='display'>
        <div className='view-controls'>
          <h3>Filter by</h3>
            <ul className='filters'>
              <li onClick={()=>this.props.fetchStudents()} className={this.props.visibilityFilter === 'SHOW_ALL'? 'active' : undefined}>All students</li>
              <li onClick={()=>this.props.setVisibility('SHOW_UNREGISTERED_STUDENTS')} className={this.props.visibilityFilter === 'SHOW_UNREGISTERED_STUDENTS'? 'active' : undefined}>Unregistered students</li>
            </ul>
          <h3>Sort by</h3>
            <ul className='sorting'>
              <li onClick={()=>this.props.sortBy('BY_LASTNAME')} className={this.props.sortFilter === 'BY_LASTNAME' ? 'active':undefined}>Lastname</li>
              <li onClick={()=>this.props.sortBy('BY_GPA')} className={this.props.sortFilter === 'BY_GPA' ? 'active':undefined}>GPA</li>
            </ul>
        </div>
        <ul id='all-students'>
          {studentsOnPage.map((each) => {
            return (
            <li
              key={each.id}
            //   style={{
            //   display: each.show === false && "none"
            // }}
            >
              <div className='info'>
                <Link to={'/students/'+each.id} onClick={() => this.props.selectStudent(each.id)}>
                <h3> 🎓 {each.firstName} {each.lastName}</h3>
                </Link>
                <h4>Email</h4>
                <p>{each.email}</p>
                <h4>GPA</h4>
                <p>{each.gpa}</p>
              </div>
              <div className='graphic'>
                <img src={each.imageUrl} />
              </div>
              <button className='delete' onClick={() => this.props.deleteStudent(each)}>Delete</button>
            </li>)
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    newStudent: state.newStudent,
    visibilityFilter: state.visibilityFilter,
    sortFilter: state.sortFilter,
    studentsOnPage: state.studentsOnPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => {
      return dispatch(fetchStudents())
    },
    selectStudent: (selectedStudentId) => {
      return dispatch(selectStudent(selectedStudentId))
    },
    deleteStudent: (student) => {
      return dispatch(deleteStudent(student))
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

export default connect(mapStateToProps,mapDispatchToProps)(AllStudents)
