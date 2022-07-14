/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, students, deleteStudent, editStudent} = props;

  
  //if no students for campus, render campus with message that there are no students
  if(!campus.students.length)
  {
    return (
      <div>
        <img src = {"https://www.dakotacollege.edu/application/files/3815/4834/4222/school.png"} alt ="default campus"/>
        <h1>Campus Name: {campus.name}</h1>
        <p>Campus Address: {campus.address}</p>
        <p>Campus Description{campus.description}</p>
        <Link to={`/campuses`}>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          </Link> 
       <h3>No students currently enrolled.</h3> 
       <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      </div>
    )

  }
  
  //if students exist, render campus with students
  else
  {
    return (
      <div>
        <img src = {"https://www.dakotacollege.edu/application/files/3815/4834/4222/school.png"} alt ="default campus"/>
        <h1>Campus Name: {campus.name}</h1>
        <p>Campus Address: {campus.address}</p>
        <p>Campus Description{campus.description}</p>
        <Link to={`/campuses`}>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          </Link> 
        {campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>Name: {name}</h2>
              </Link>
              <Link to={`/campus/${campus.id}`}>
                  <button onClick={() => editStudent(student)}>Unenroll {name}</button>
              </Link>             
            </div>
          );
        })}
          <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      </div>
    )
  }    
  };
  
export default CampusView;