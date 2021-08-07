import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import axios from "axios";
import envVars from "../../config";
import "./Modal.css";

function Modal({ data }) {
  console.log(data)
  return (
    <div className='venue-holder'>
      {data &&
        <div className='venues'>
                {data?.map(venue => {
            return (
              <div key={venue.id} className='venue'>
                <div className='venue-name'>{venue.venue.name}</div>
                <div className='venue-address'>{venue.venue.location.formattedAddress[0]}</div>
                {/* <div className='venue-city'>{venue.city}</div>
                <div className='venue-state'>{venue.state}</div>
                <div className='venue-zip'>{venue.zip}</div>
                <div className='venue-phone'>{venue.phone}</div>
                <div className='venue-website'>{venue.website}</div>
                <div className='venue-email'>{venue.email}</div> */}
              </div>
            );
          })}
        </div>
      }
    </div>
  );

}


export default Modal;
