import React from 'react'
import { connect } from 'react-redux'
import { addCampus } from '../store'

class AddCampus extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name] : ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.addCampus({...this.state});
  }

  render() {
    console.log(this.state)
    return (
      <div id='add-campus'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Enter name:</label>
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          <label htmlFor='address'>Enter address:</label>
          <input type='text' name='address' value={this.state.address} onChange={this.handleChange} />
          <button type='submit'>submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCampus: (campus) => {
      return dispatch(addCampus(campus))
    }
  }
}

export default connect(null,mapDispatchToProps)(AddCampus)
