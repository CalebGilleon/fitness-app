import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import UsersList from "./components/users-list.component";
import NotFound from "./components/not-found.component";
import UserProfile from "./components/user-profile.component";

function App() {
  return (
    <Router>
        <Navbar />
        <div className="container">
        <br />
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit_exercise/:id" element={<EditExercise />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
