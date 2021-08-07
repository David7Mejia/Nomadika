import React from "react";

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
              </div>
            );
          })}
        </div>
      }
    </div>
  );

}


export default Modal;
