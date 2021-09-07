import React from "react";
import "./Modal.css";
import {addVenueThunk} from '../../store/gotos'
import {useDispatch, useSelector} from 'react-redux'
function Modal({ data }) {
  const dispatch = useDispatch();

  const addVenue = async (e) => {
    console.log('add venue', e);
    let loc_id = ;
    let venue_id = ;
    
    // dispatch(addVenueThunk(e))

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
