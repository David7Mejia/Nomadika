import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
// import {useLocation} from 'react-router-dom'; }

function Destination() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.session).user;
  const location = useLocation();
  const { place } = location.state || {};

  console.log("destination page", place);
  return <div className="blue">hello</div>;
}
export default Destination;
