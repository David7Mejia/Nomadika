import React from "react";

import "./Modal.css";

function Modal(qData ) {
  console.log('THIS IS MODAL DATA',qData)
  return (
    <div className='venue-holder'>
      <div className='modal-venues'> VENUES </div>
      {/* {data &&
        <div className='venues'>
        {[data]?.map(venue => {
                  console.log('THIS IS VENUE',venue)
            return (
              <div key={venue.id} className='venue'>
                <div className='venue-name'>{venue.venue?.name}</div>
                <div className='venue-address'>{venue.venue?.location.formattedAddress[0]}</div>
              </div>
            );
          })}
        </div>
      } */}
    </div>
  );

}


export default Modal;
