/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const {allCampuses, deleteCampus} = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>
        <p>There are no campuses</p>
        <Link to ={'newcampus'}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <img src = {"https://www.dakotacollege.edu/application/files/3815/4834/4222/school.png"} alt ="default campus"/>
          <Link to={`/campus/${campus.id}`}>
            <h2>Campus name: {campus.name}</h2>
          </Link>
          <h4>Campus id: {campus.id}</h4>
          <p>Campus address: {campus.address}</p>
          <p>Campus description: {campus.description}</p>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;