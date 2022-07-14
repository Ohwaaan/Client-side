import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { 
  editStudentThunk,
  fetchStudentThunk 
} from '../../store/thunks';
import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
    
  // Initialize state
    constructor(props) {
      super(props);

      this.state = {
        firstname: props.firstname, 
        lastname: props.lastname,
        email: props.email,
        imageURL: props.imageURL,
        GPA: props.GPA,
        campusId: props.campusId,
        redirect: false, 
        redirectId: null
      };
    }

    // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        GPA: this.state.GPA,
        campusId: this.state.campusId
    };

    // Add modified student in back-end database
    let modifiedStudent = await this.props.editStudent(student.id, student);


    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageURL: "",
      GPA: "",
      campusId: null, 
      redirect: true, 
      redirectId: modifiedStudent.id
    });
  }

      // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
}

// Render new student input form
render() {
  // Redirect to new student's page after submit
  if(this.state.redirect) {
    return (<Redirect to={`/student/${this.state.redirectId}`}/>)
  }

  // Display the input form via the corresponding View component
  return (
    <div>
      <Header />
      <EditStudentView 
        handleChange = {this.handleChange} 
        handleSubmit = {this.handleSubmit}    
        student      = {this.state}
      />
    </div>          
  );
}
}



// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (studentId) => dispatch(fetchStudentThunk(studentId))
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapDispatch)(EditStudentContainer);