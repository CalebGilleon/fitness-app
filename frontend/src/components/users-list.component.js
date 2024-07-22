import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreateUser from "./create-user.component";
import "../styles/users-list.css";

const UserCard = ({ user, deleteUser }) => {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchTotalDuration = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/exercises/total-duration/${user.username}`);
        setTotalDuration(response.data.totalDuration);
      } catch (error) {
        console.error('Error fetching total duration:', error);
      }
    };

    fetchTotalDuration();
  }, [user.username]);

  return (
    <div className="card me-3 mb-3 shadow" style={{ width: "200px" }}>
      <div className="card-header fw-bold">{user.username}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {totalDuration} minutes logged
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <Link to={`/profile/${user._id}`} className="btn btn-primary py-0">
            Profile
          </Link>
          <button
            onClick={() => deleteUser(user._id)}
            className="btn"
          >
            <img src="/trashcan.png" alt="Delete" style={{ width: "20px", marginRight: "5px" }} />
          </button>
        </li>
      </ul>
    </div>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => {
        console.log(response.data);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const userList = users.map((currentUser) => (
    <UserCard
      user={currentUser}
      deleteUser={deleteUser}
      key={currentUser._id}
    />
  ));

  return (
    <div>
      <CreateUser />
      <h3>Users</h3>
      <div className="users-list">{userList}</div>
    </div>
  );
};

export default UsersList;
