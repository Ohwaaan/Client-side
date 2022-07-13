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

import { addCampusThunk } from '../../store/thunks'; 
import NewCampusView from '../views/NewCampusView';

class NewCampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:         "", 
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
      address:      this.state.address,
      description:  this.state.description
    };

    let newCampus = await this.props.addCampus(campus);

    this.setState({
      name :       "",
      address:     "",
      description: "",
      campusId:   null,
      redirect:   true,
      redirectId: newCampus.id
    });
  }

  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectID}`}/>)
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