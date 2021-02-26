import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
  }
  async submit(ev) {
    //takes in ev as an argument
    //when you submit a form, the first line should be... default reaction will be for form to refresh the page.. dont want that to happen
    ev.preventDefault();
  }
  render() {
    return (
      <div>
        <center>
          <h1> What should I eat for dinner tonight? </h1>
          <img src = "dinner-home-page.jpg" />
          <div className="gap-10"/>
          <Link to="/randommeal">Tell me what's for dinner!</Link>
          <div className="gap-20"/>
          <form>
            <label>Actually I have some things at home... show me meals where I can use:</label>
            <input type="text" name="ingredient" placeholder="Insert item here" />
          </form>
        </center>
      </div>
    );
  }
}
export default Home;
