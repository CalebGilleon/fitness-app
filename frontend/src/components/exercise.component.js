import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Exercise = ({ exercise, deleteExercise }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration} mins</td>
      <td>{formatDate(exercise.date)}</td>
      <td>
        <Link to={`/edit_exercise/${exercise._id}`} className="btn btn-primary py-0" style={{}}>
          Edit
        </Link> |
        <button onClick={() => deleteExercise(exercise._id)} className="btn" style={{padding: "0px"}}>
          <img
            src="/trashcan.png"
            alt="Delete"
            style={{ width: "20px", paddingBottom: "3px"}}
          />
        </button>
      </td>
    </tr>
  );
};

export default Exercise;
