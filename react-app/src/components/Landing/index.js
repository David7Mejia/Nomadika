import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import envVars from "../../config";
import "./Landing.css";
const request = require("request");

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.session).user;
  const [queryField, setQueryField] = useState(null);

  // let place;

  // let url = `https://api.foursquare.com/v2/venues/search`;

  // // const test = client_id;

  // // console.log("helllllllllllllo", envVars);
  const client_id = envVars.client_id;
  const client_secret = envVars.client_secret;


  let place = "Boston";

  useEffect(() => {
    const res = fetch(
      `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&near=boston`
    )
      .then((response) => response.json())
      .then((resp) => console.log(resp));
    console.log('REEEEEEEEEEEES',res);
  });

  const handleQuery = (e) => {
    setQueryField(e.target.value);

    place = e.target.value;
    // console.log("@@@@@@@@@@@@@@@@@@", place);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="background-img">
      <div className="container">
        <label className="search-container">
          Your next adventure, starts here.
          <form className="search-items" onSubmit={onSubmit}>
            <input
              className="nav-search"
              type="search"
              placeholder="Search your destination"
              onChange={handleQuery}
            />
            <button type="submit">hi</button>
          </form>
        </label>{" "}
      </div>
    </div>
  );
}
export default Landing;
