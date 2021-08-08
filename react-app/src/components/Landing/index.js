import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
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
          <div className="landing-text">Find venues near you</div>
          <form className="search-items" onSubmit={onSubmit}>
            <input
              className="nav-search"
              type="search"
              placeholder="Search your city"
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
          <div className="small-text-login">
            Search cities and get venue information.
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
