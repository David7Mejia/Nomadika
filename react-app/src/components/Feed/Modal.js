import React from "react";
import "./Modal.css";
import {addVenueThunk} from '../../store/gotos'
import {useDispatch, useSelector} from 'react-redux'
import { getGotoVenueThunk } from '../../store/gotos';

function Modal({ payload, data }) {
  const dispatch = useDispatch();
  const baseURL = `https://www.google.com/maps/search/?api=1&query=`

  const googleMapUrl = (ven) => {
    let venueName = ven.venue.name;
    let address = ven.venue.location.formattedAddress
    let str = `${venueName}`;
    address.forEach(el => {
      str += ` ${el}`
    })
    let newURL = str.split(' ').join('+')
    return `${baseURL}${newURL}`
  }

  const addVenue = async (e) => {
    let loc_id = payload;
    let venue_id = e[0];
    let venue_name = e[1];
    let address = e[2];
    let loc_name = e[3];

    await dispatch(addVenueThunk({
      loc_id,
      loc_name,
      venue_id,
      venue_name,
      address
    }))
    await dispatch(getGotoVenueThunk(payload));
  }

  return (
    <div className='venue-holder'>
      <div className='modal-venues'> VENUES </div>
      {data &&
        <div className='venues'>
        {data?.map(venue => {
            return (
              <div key={venue.referralId} className="venue">
                <a
                  rel="noreferrer"
                  href={googleMapUrl(venue)}
                  target="_blank"
                >
                  <div className="venue-info-holder">
                    <div className="venue-name">{venue.venue?.name}</div>
                    <div className="venue-address">
                      {venue.venue?.location.formattedAddress[0]}
                    </div>
                  </div>
                </a>
                <button
                  id="add-button"
                  onClick={() =>
                    addVenue([
                      venue.referralId,
                      venue.venue.name,
                      venue.venue?.location.formattedAddress[0],
                      venue.venue?.location.city
                    ])
                  }
                ></button>
              </div>
            );
          })}
        </div>
      }
    </div>
  );

}


export default Modal;
