import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Feed from "../Feed";
import "./Destination.css";
import axios from "axios";
import envVars from "../../config";

function Destination() {
  const loggedIn = useSelector((state) => state.session).user;
  const location = useLocation();
  const [data, setData] = useState(null);
  const { place } = location.state || {};
  const client_id = envVars.client_id;
  const client_secret = envVars.client_secret;

  useEffect(() => {
    const axData = async () => {
      const res = await axios(
        `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&near=${place}`
      );
      console.log(res.data.response);
      setData(res.data);
    };
    axData();
  }, []);

  return (
    <div>
      <div className="place-name">{place.toUpperCase()} </div>
      <div className="dest-feed">
        <Feed />
      </div>
      <div className="venue-info">
        {data &&
          data.response.venues.map((item, index) => (
            <div key={index}>
              <div className="venue-name">{item.name}</div>
              <div className="venue-address">
                {item.location.formattedAddress}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Destination;
