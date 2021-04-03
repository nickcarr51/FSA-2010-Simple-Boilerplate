import React from 'react'
import { connect } from 'react-redux'
import { updateCampus,selectCampus } from '../store'

class EditCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedCampus ? props.selectedCampus.name : '',
      address: props.selectedCampus ? props.selectedCampus.address : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.props.selectCampus(this.props.match.params.campusId*1);
  //   console.log(this.props);
  // }

  handleChange(ev) {
    this.setState({
      [ev.target.name] : ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log({...this.props.selectedCampus, ...this.state});
    this.props.updateCampus({...this.props.selectedCampus, ...this.state});
  }

  render() {
    return (
    <div id='edit-campus'>
      <form onSubmit={this.handleSubmit}>
        <h4>Edit campus</h4>
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

const mapStateToProps = (state, {match}) => {
  const selectedCampusId = +match.params.campusId;
  return {
    selectedCampus: state.campuses.find((elem) => elem.id === selectedCampusId)
  }
}

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    updateCampus: (selectedCampus) => {
      return dispatch(updateCampus(selectedCampus,history))
    },
    selectCampus: (selectedCampusId) => {
      return dispatch(selectCampus(selectedCampusId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCampus)
