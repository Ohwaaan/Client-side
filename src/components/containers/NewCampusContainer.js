/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

/*----------------EVERYTHING BELOW HERE IS MY TEST CODE,MAY OR MAY NOT WORK------------*/ 
/*----------------EVERYTHING BELOW HERE IS MY TEST CODE,MAY OR MAY NOT WORK------------*/ 
/*----------------EVERYTHING BELOW HERE IS MY TEST CODE,MAY OR MAY NOT WORK------------*/ 
/*----------------LOOK AT NewStudentContainer.js IF SOMETHING DONT WORK----------------*/ 

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { 
  addCampusThunk,
  fetchAllCampusesThunk
  } from '../../store/thunks'; 

import NewCampusView from '../views/NewCampusView';
import AllCampusesContainer from './AllCampusesContainer';
import { allCampuses } from '../../store/reducers';

class NewCampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:         "", 
      imageURL:     "",
      address:      "", 
      description:  "",
      campusId:   null, 
      redirect:   false, 
      redirectId: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    let campus = {
      name:         this.state.name,
      imageURL:     this.state.imageURL,
      address:      this.state.address,
      description:  this.state.description,
      campusId:     this.state.campusId
    };

    // Add new campus in back-end database
    let newCampus = await this.props.addCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name :       "",
      imageURL:    "",
      address:     "",
      description: "",
      campusId:   allCampuses.length+1,
      redirect:   true,
      redirectId: newCampus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <NewCampusView 
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return({
      addCampus: (campus) => dispatch(addCampusThunk(campus)),
  })
}
export default connect(null, mapDispatch)(NewCampusContainer);