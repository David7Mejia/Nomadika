import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import envVars from "../../config";
import "./Landing.css";
const request = require("request");

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.session).user;
  const [queryField, setQueryField] = useState(null);
  const [data, setData] = useState(null);
  const [place, setPlace] = useState(null);

  const client_id = envVars.client_id;
  const client_secret = envVars.client_secret;

  // let place;
  let query = "tacos";


  const handleQuery = (e) => {
    setPlace(e.target.value);
    // place = e.target.value;

  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  console.log(place)

  // useEffect(() => {
  //   const axData = async () => {
  //     const res = await axios(
  //       `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&near=${place}&query=${query}`
  //     );
  //     // console.log(res.data.response);
  //     setData(res.data);
  //   };
  //   axData();
  // }, []);
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
            {/* <button type="submit">hi</button> */}
            <Link to={{
              pathname: "/destination",
              state: {place: place}
            }}> CLICK ME </Link>
          </form>
        </label>{" "}
      </div>

      {/* <div className="venue-info">
        {data && data.response.venues.map((item, index) => (
          <div key={index}>
            <div className="venue-name">
              {item.name}
            </div>
            <div className="venue-address">
              {item.location.formattedAddress}
            </div>
          </div>
                ))}

      </div> */}
    </div>
  );
}
export default Landing;
