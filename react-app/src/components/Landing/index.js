import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.session).user;
  const [place, setPlace] = useState(null);

  const handleQuery = (e) => {
    setPlace(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="background-img">
      <div className="container">
        <label className="search-container">
          <div className='landing-text'>
          Find venues near you
          </div>
          <form className="search-items" onSubmit={onSubmit}>
            <input
              className="nav-search"
              type="search"
              placeholder="Search your destination"
              onChange={handleQuery}
            />
            <Link
              to={{
                pathname: `/cities/${place}`,
                state: { place: place },
              }}
              className="nav-search-submit"
            >
              Search
            </Link>
          </form>
        </label>
      </div>
    </div>
  );
}
export default Landing;
