import React from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AllCampuses from './components/AllCampuses'
import AllStudents from './components/AllStudents'
import Home from './components/Home'
import { connect } from 'react-redux'
import { fetchCampuses } from './store.js'

class App extends React.Component {

  componentDidMount() {
    this.props.load()
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
      </Router>
      </>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchCampuses())
  }
}

export default connect(null,mapDispatchToProps)(App);
