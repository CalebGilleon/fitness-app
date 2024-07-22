import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./exercise.component";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        const sortedExercises = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExercises(sortedExercises);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, []);

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

  const exerciseList = exercises.map((currentExercise) => (
    <Exercise
      exercise={currentExercise}
      deleteExercise={deleteExercise}
      key={currentExercise._id}
    />
  ));

  return (
    <div>
      <h3>Logged Exercises</h3>
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
    </div>
  );
};

export default ExercisesList;
