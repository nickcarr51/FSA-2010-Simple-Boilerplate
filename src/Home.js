import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import NavBar from "./NavBar";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    },
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  async handleChange(ev){
    this.setState({value: ev.target.value})
  }

  async submit(ev) {
    ev.preventDefault();
  }
  render() {
    console.log("the state right now is", this.state.value)
    return (
      <div>
        <NavBar />
        <center>
          <h1> What should I eat for dinner tonight? </h1>
          <img src = "dinner-home-page.jpg" />
          <div className="gap-10"/>
          <NavLink to="/randommeal" className="main-nav">Tell me what's for dinner!</NavLink>
          <div className="gap-20"/>
          <form onSubmit={this.submit}>
            {/* <label>Actually I have some things at home... show me meals where I can use:</label> */}
            {/* <input type="text" value={this.state.value} placeholder="Insert value here" onChange={this.handleChange}/>
            <input type="submit" value="submit"/> */}
          </form>
        </center>
      </div>
    );
  }
}
export default Home;
