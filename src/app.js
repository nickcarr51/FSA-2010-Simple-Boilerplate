import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import AllCampuses from './components/AllCampuses'
import AllStudents from './components/AllStudents'
import SingleCampus from './components/SingleCampus'
import SingleStudent from './components/SingleStudent'
import Nav from './components/Nav'
import Home from './components/Home'
import AddCampus from './components/AddCampus'
import AddStudent from './components/AddStudent'
import EditCampus from './components/EditCampus'
import EditStudent from './components/EditStudent'
import ErrorPage from './components/ErrorPage'
import { fetchCampuses, fetchStudents } from './store.js'

class App extends React.Component {

  componentDidMount() {
    this.props.loadCampus();
    this.props.loadStudent();
  }

  render() {
    console.log(this.props);
    return (
      <>
      <Router>
          <Route path='/' component={Nav} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/campuses' component={AllCampuses} />
          <Route exact path='/campuses/:campusId' component={SingleCampus} />
          <Route exact path='/students' component={AllStudents} />
          <Route exact path='/students/:studentId' component={SingleStudent} />
          <Route component={ErrorPage} />
        </Switch>
          <Route exact path='/students' component={AddStudent} />
          <Route exact path='/campuses' component={AddCampus} />
          <Route exact path='/campuses/:campusId' component={EditCampus} />
          <Route exact path='/students/:studentId' component={EditStudent} />
      </Router>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampus: () => dispatch(fetchCampuses()),
    loadStudent: () => dispatch(fetchStudents())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
