import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Exercise from "./exercise.component";
import ActivityChart from "./activity-chart.component";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:5000/users/${id}`
        );
        setUser(userResponse.data);

        const exercisesResponse = await axios.get(
          `http://localhost:5000/exercises/user/${userResponse.data.username}`
        );

        setExercises(exercisesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        console.log(response.data);
        setExercises(exercises.filter((exercise) => exercise._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting exercise:", error);
      });
  };

  const exerciseList = exercises.length ? (
    exercises.map((currentExercise) => (
      <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />
    ))
  ) : (
    <tr>
      <td colSpan="5">No exercises found</td>
    </tr>
  );

  return (
    <div>
      <h3>{user.username ? user.username + "'s Exercises" : "Loading..."}</h3>{" "}
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList}</tbody>
      </table>
      <ActivityChart exercises={exercises} />
    </div>
  );
};

export default UserProfile;
