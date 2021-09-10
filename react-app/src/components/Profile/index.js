import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserVenuesThunk, deleteGotoVenueThunk } from "../../store/gotos";
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userPlaces = useSelector((state) => Object.values(state?.gotos));
  const baseURL = `https://www.google.com/maps/search/?api=1&query=`;

  const googleMapUrl = (loc, ven, address) => {
    let str = `${loc} ${ven} ${address}`;
    let newURL = str.split(" ").join("+");
    return `${baseURL}${newURL}`;
  };

  const placeConverter = (place) => {
    let obj = {};
    place[0]?.forEach((item) => {
      if (obj[item.loc_name]) {
        obj[item.loc_name].push(
        [item.venue_name, item.address, item.id]
        );
      } else {
        obj[item.loc_name] = [[item.venue_name, item.address, item.id]];
      }
    });
    return obj;
  };

  let userVenues = placeConverter(userPlaces);

   const deleteVenue = async (id) => {
    await dispatch(deleteGotoVenueThunk(id));
    await dispatch(getUserVenuesThunk(sessionUser.id));

   };

  useEffect(() => {
    dispatch(getUserVenuesThunk(sessionUser.id));
  }, []);

  return (
    <>
      <div className="place-name">{sessionUser.username}</div>
      <div className="profile-venue-holder">
        {userVenues &&
          Object.entries(userVenues).map(([key, value]) => (
            <div className="profile-venue-city">
              <p className="profile-city-name">
                <Link
                  to={{
                    pathname: `/cities/${key}`,
                    state: { place: key },
                  }}
                  id="city-link"
                >
                  {key}
                </Link>
              </p>
              <div className="places-holder" id="profile-places-holder">
                {value.map((item) => (
                  <div className="venue-for-profile" id="places-holder-profile">
                    <a
                      rel="noreferrer"
                      href={googleMapUrl(key, item[0], item[1])}
                      target="_blank"
                      className='link-holder-profile'
                    >
                      {item[0]}
                      &nbsp;
                      {item[1].substring(0, 15) + "..."}
                    </a>
                    <button
                      id="delete-venue"
                      onClick={() => deleteVenue(item[2])}
                      style={{marginLeft: '5px'}}
                    ></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Profile;
