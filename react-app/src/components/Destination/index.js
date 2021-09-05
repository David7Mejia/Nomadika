/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Feed from "../Feed";
import { postLocation } from "../../store/location";
import { getDestFeed } from "../../store/destination";
import { getExtInfo } from "../../store/externalAPI";
import "./Destination.css";

function Destination() {
  const location = useLocation();
  const { place } = location.state || {};
  const dispatch = useDispatch();
  const extAPI = useSelector((state) => state.externalAPI);
  const longId = extAPI?.response?.geocode.feature.longId;

  useEffect(() => {
   dispatch(getExtInfo(place));
  }, [])

  useEffect(() => {
    if (!longId) return;
    try {
      dispatch(
        postLocation({
          api_id: longId,
          name: place,
          description: null,
          image_url: null,
        })
      );
    } catch (err) {
      console.log("Location exists in database");
    }
  }, [dispatch, longId, place]);

  useEffect(() => {
    if (longId) {
      dispatch(getDestFeed(longId));
    } else {
      return;
    }
  }, [dispatch, longId]);

  return (
    <div>
      <div className="place-name">{place.toUpperCase()} </div>
      <div className="dest-feed">
        {longId && (
          <Feed
            payload={longId}
            place={place}
          />
        )}
      </div>
    </div>
  );
}
export default Destination;
