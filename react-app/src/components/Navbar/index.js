import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const demoHandler = async (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    return;
  };

  let navLinks;

  if (sessionUser) {
    navLinks = <LogoutButton />;
  } else {
    navLinks = (
      <div className="unauth-nav">
        <NavLink
          to="/login"
          exact={true}
          className="neo-buttons login-button"
          activeClassName="active"
        >
        </NavLink>

        <NavLink
          to="/sign-up"
          exact={true}
          className="neo-buttons signup-button"
          activeClassName="active"
        >
          Sign Up
        </NavLink>
        <button onClick={(e) => demoHandler(e)} className="neo-buttons" id='demo-button'>
          Demo
        </button>
      </div>
    );
  }

  return (
    <nav className="navbar-container">
      <NavLink to="/" exact={true} activeClassName="active" className='site-home'>
        NOMADIKA
      </NavLink>

      {navLinks}
    </nav>
  );
};

export default NavBar;
