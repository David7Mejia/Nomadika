import React from "react";

import "./Modal.css";

function Modal({data} ) {
  return (
    <div className='venue-holder'>
      <div className='modal-venues'> VENUES </div>
      {data &&
        <div className='venues'>
        {data?.map(venue => {
          console.log('this is the venue', venue)
            return (
              <div key={venue.referralId} className="venue">
                <div className="venue-name">
                  {venue.venue?.name}
                  <button id="add-button">Add</button>
                </div>
                <div className="venue-address">
                  {venue.venue?.location.formattedAddress[0]}
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );

}


export default Modal;
