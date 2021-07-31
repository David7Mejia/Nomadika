import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import "./Navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const demoHandler = async (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    return;
  };

  return (
    <nav className="navbar-container">
      <NavLink to="/" exact={true} activeClassName="active">
        Home
      </NavLink>

      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>

      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>
      <button onClick={(e) => demoHandler(e)} className="demo-login">
        Demo
      </button>
      <LogoutButton />
    </nav>
  );
};

export default NavBar;
