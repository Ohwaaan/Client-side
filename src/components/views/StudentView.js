/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent, campus } = props;
  
   //if campus exists, render with campus name
  if (student.campusId != null)
  {
    // Render a single Student view 
    return (
      <div>
        <img src = {"https://sportlinx360.com/sites/default/files/public_uploads/Website_content/Website_Logos/graduate-student-avatar.png"} alt ="default student"/>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <Link to={`/campus/${student.campusId}`}>
          <h3>{student.campus.name}</h3>
        </Link>
        <h3>{student.email}</h3>
        <h3>{student.gpa}</h3>
        <Link to={`/students`}>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </Link>
      </div>
    );
  }
  
  //if campus does not exist, render without a campus name
  else {
    return (
      <div>
        <img src = {"https://sportlinx360.com/sites/default/files/public_uploads/Website_content/Website_Logos/graduate-student-avatar.png"} alt ="default student"/>
        <h1>{student.firstname + " " + student.lastname}</h1>
          <h3>Not enrolled at the moment.</h3>
        <h3>{student.email}</h3>
        <h3>{student.gpa}</h3>
        <Link to={`/students`}>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </Link>
      </div>

    );
  }
};

export default StudentView;