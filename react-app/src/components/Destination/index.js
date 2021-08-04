import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Feed from "../Feed";
import axios from "axios";
import envVars from "../../config";
import { postLocation } from "../../store/location";
import { getDestFeed } from "../../store/destination";
import "./Destination.css";

function Destination() {
  // const loggedIn = useSelector((state) => state.session).user;
  const location = useLocation();
  const [data, setData] = useState(null);
  const { place } = location.state || {};
  const newLocation = useSelector((state) => state.location);
  const client_id = envVars.client_id;
  const client_secret = envVars.client_secret;
  const payload = data?.response.geocode.feature.longId;
  const dispatch = useDispatch();

  useEffect(() => {
    const axData = async () => {
      const res = await axios(
        `https://api.foursquare.com/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=10&near=${place}`
      );
      setData(res.data);
    };
    axData();
  }, []);

  useEffect(() => {
    dispatch(
      postLocation({
        api_id: payload,
        name: place,
        description: null,
        image_url: null,
      })
    );
  }, [dispatch, payload, place]);

  useEffect(() => {
    if (payload) {
      dispatch(getDestFeed(payload));
    }
  }, [dispatch, payload]);

  return (
    <div>
      <div className="place-name">{place.toUpperCase()} </div>
      <div className="dest-feed">
        <Feed payload={payload} data={data} />
      </div>
      {/* <div className="venue-info">
        {data &&
          data.response.venues.map((item, index) => (
            <div key={index}>
              <div className="venue-name">{item.name}</div>
              <div className="venue-address">
                {item.location.formattedAddress}
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
}
export default Destination;
