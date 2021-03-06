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
  let backUpPlace = useSelector(
    (state) => state.externalAPI?.response?.geocode?.longId
  );
  const extAPI =
    useSelector(
      (state) => state.externalAPI?.response?.geocode?.feature?.longId
    ) ||
    backUpPlace

  useEffect(async() => {
    dispatch(getExtInfo(place));

  }, [dispatch, place]);


  useEffect(() => {
    if (extAPI) {
      dispatch(
        postLocation({
          api_id: extAPI,
          name: place,
          description: null,
          image_url: null,
        })
        );
       dispatch(getDestFeed(extAPI));
    }
  }, [dispatch, extAPI, place]);

  return (
    <div>
      <div className="place-name">{place.toUpperCase()} </div>
      <div className="dest-feed">
        {extAPI && <Feed payload={extAPI} place={place} />}
      </div>
    </div>
  );
}
export default Destination;
