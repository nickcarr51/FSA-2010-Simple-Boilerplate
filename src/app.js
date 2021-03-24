import React from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AllCampuses from './components/AllCampuses'
import AllStudents from './components/AllStudents'
import SingleCampus from './components/SingleCampus'
import SingleStudent from './components/SingleStudent'
import Home from './components/Home'
import { connect } from 'react-redux'
import { fetchCampuses, fetchStudents } from './store.js'

class App extends React.Component {

  componentDidMount() {
    this.props.loadCampus();
    this.props.loadStudent();
  }

  render() {
    return (
      <>
      <Router>
        <div id='nav'>
          <Link to='/'><h2>Home</h2></Link>
          <Link to='/campuses'><h2>Campuses</h2></Link>
          <Link to='/students'><h2>Students</h2></Link>
        </div>
        <Route exact path='/' component={Home} />
        <Route exact path='/campuses' component={AllCampuses} />
        <Route exact path='/students' component={AllStudents} />
        <Route path='/campuses/:campusId' component={SingleCampus} />
        <Route path='/students/:studentId' component={SingleStudent} />
      </Router>
      </>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampus: () => dispatch(fetchCampuses()),
    loadStudent: () => dispatch(fetchStudents())
  }
}

export default connect(null,mapDispatchToProps)(App);
