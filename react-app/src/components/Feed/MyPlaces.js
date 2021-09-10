import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGotoVenueThunk, deleteGotoVenueThunk } from '../../store/gotos';
import "./Modal.css";


function MyPlaces({payload}) {
    const myVenues = useSelector(state => Object.values(state.gotos));
    const dispatch = useDispatch();

  const deleteVenue = async (id) => {
    await dispatch(deleteGotoVenueThunk(id));
    dispatch(getGotoVenueThunk(payload));
  }
    useEffect(() => {
        dispatch(getGotoVenueThunk(payload));
    }, [payload, dispatch]);

    return (
      <div className="places-holder">
        {myVenues &&
          myVenues[0]?.map((venue) => (
            <div key={venue.id} className="venue" id="places-holder">
              <div className="venue-info-holder">
                <div id="my-venues">{venue.venue_name}</div>
                <div id="my-venues">{venue.address}</div>
              </div>
              <button id="delete-venue" onClick={()=> deleteVenue(venue.id)}></button>
            </div>
          ))}
      </div>
    );

}
export default MyPlaces;
