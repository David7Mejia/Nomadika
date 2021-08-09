/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Feed from "../Feed";
import axios from "axios";
// import envVars from "../../config";
import { client_id } from "../../config/";
import { client_secret } from "../../config/";

import { postLocation } from "../../store/location";
import { getDestFeed } from "../../store/destination";
import "./Destination.css";

function Destination() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [trending, setTrending] = useState(null);
  const { place } = location.state || {};
  // const client_id = envVars.client_id;
  // const client_secret = envVars.client_secret;
  const payload = data?.response.geocode.feature.longId;
  const dispatch = useDispatch();

  useEffect(() => {
    const axData = async () => {
      const res = await axios(
        `https://api.foursquare.com/v2/venues/search?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=10&near=${place}`
      );
      setData(res.data);
    };
    axData();
  }, []);

  useEffect(() => {
    const axData = async () => {
      const res = await axios(
        `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}`
      );
      setTrending(res.data);
    };
    axData();
  }, []);

  useEffect(() => {
    if (!payload) return;
    try {
      dispatch(
        postLocation({
          api_id: payload,
          name: place,
          description: null,
          image_url: null,
        })
      );
    } catch (err) {
      console.log("Location exists in database");
    }
  }, [dispatch, payload, place]);

  useEffect(() => {
    if (payload) {
      dispatch(getDestFeed(payload));
    } else {
      return;
    }
  }, [dispatch, payload]);

  return (
    <div>
      <div className="place-name">{place.toUpperCase()} </div>
      <div className="dest-feed">
        {data && (
          <Feed
            payload={data.response.geocode.feature.longId}
            place={place}
            trending={trending}
          />
        )}
      </div>
    </div>
  );
}
export default Destination;
