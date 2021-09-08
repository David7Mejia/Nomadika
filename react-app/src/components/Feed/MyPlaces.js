import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGotoVenueThunk } from '../../store/gotos';
import "./Modal.css";


function MyPlaces({payload}) {
    const myVenues = useSelector(state => Object.values(state.gotos));
  const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getGotoVenueThunk(payload));
    }, []);

    return (
      <div className="places-holder">
        {myVenues &&
          myVenues[0]?.map((venue) => (
            <div key={venue.id} className="venue">
              <div id="my-venues">{venue.venue_name}</div>
              <div id="my-venues">{venue.address}</div>
            </div>
          ))}
      </div>
    );

}
export default MyPlaces;
