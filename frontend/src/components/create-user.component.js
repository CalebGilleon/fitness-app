import React, { useState } from "react";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

const CreateUser = () => {
  const [username, setUsername] = useState("");

    const onChangeUsername = (e) => {
      setUsername(e.target.value);
    };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = { username };

    try {
      const response = await axios.post(
        "http://localhost:5000/users/add",
        user
      );
      console.log(response.data);
      setUsername("");
      // toast.success("User added successfully!");
      window.location = "/users"
    } catch (err) {
      console.error("There was an error creating the user!", err);
      // toast.error("This user already exists!");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div class="input-group mb-3">
          <input
            type="text"
            required
            value={username}
            onChange={onChangeUsername}
            className="form-control"
            placeholder="username"
            aria-label="Recipient's username"
            aria-describedby="add-user-button"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="add-user-button"
          >
            Add User
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default CreateUser;
