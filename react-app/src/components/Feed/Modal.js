import React from "react";
import "./Modal.css";
import {addVenueThunk} from '../../store/gotos'
import {useDispatch, useSelector} from 'react-redux'
import { getGotoVenueThunk } from '../../store/gotos';

function Modal({ payload, data }) {
  const dispatch = useDispatch();

  const addVenue = async (e) => {
    let loc_id = payload;
    let venue_id = e[0];
    let venue_name = e[1];
    let address = e[2];

    await dispatch(addVenueThunk({
      loc_id,
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
                <div className="venue-name">{venue.venue?.name}</div>
                <div className="venue-address">
                  {venue.venue?.location.formattedAddress[0]}
                </div>
                <button
                  id="add-button"
                  onClick={() =>
                    addVenue([
                      venue.referralId,
                      venue.venue.name,
                      venue.venue?.location.formattedAddress[0],
                    ])
                  }
                >
                  Add
                </button>
              </div>
            );
          })}
        </div>
      }
    </div>
  );

}


export default Modal;
