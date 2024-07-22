import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/dumbbell.ico"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top me-3"
          />
          MyFitness
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Exercise Log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link active">
                New Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link active">
                Users
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            "Today I will do what others won't, so tomorrow I can accomplish what others can't" - Jerry Rice
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
