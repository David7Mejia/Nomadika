import React, {  useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Landing.css";
import { getExtInfo } from "../../store/externalAPI";
import Destination from "../Destination";

function Landing() {
  const [place, setPlace] = useState(null);
  const dispatch = useDispatch()

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
          <div className="landing-text">Find venues near you</div>
          <form className="search-items" onSubmit={onSubmit}>
            <input
              className="nav-search"
              type="search"
              placeholder="Search your city E.g Boston"
              onChange={handleQuery}
              required
              id="city-input-search"
            ></input>
            {place && (
              <Link
                  to={{
                    pathname: `/cities/${place}`,
                    state: { place: place },
                  }}
                  id="city-link"
                >
                  <div className="nav-search-submit"></div>
                </Link>
            )}
          </form>
        </label>
      </div>
      <div className="landing-right">
        <div className="landing-message">
          Hey there!
          <div className="small-text-login" id='small-text-login'>
            Search a city, interact in a feed, and add venues to your bucketlist!
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
