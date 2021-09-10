import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getUserVenuesThunk} from '../../store/gotos'
import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userPlaces = useSelector((state) => Object.values(state?.gotos));
  const baseURL = `https://www.google.com/maps/search/?api=1&query=`;

  const googleMapUrl = (loc, ven) => {
    let str = `${loc} ${ven}`;
    let newURL = str.split(" ").join("+");
    return `${baseURL}${newURL}`;
  };

  const placeConverter = (place) => {
    let obj = {};
    place[0]?.forEach((item) => {
      if (obj[item.loc_name]) {
        obj[item.loc_name].push(`${item.venue_name}, ${item.address}`);
      } else {
        obj[item.loc_name] = [`${item.venue_name}, ${item.address}`];
      }
    });
    return obj;
  };
  let userVenues = placeConverter(userPlaces);

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
              <p className="profile-city-name">{key}</p>
              <div className="places-holder" id="profile-places-holder">
                {value.map((item) => (
                  <div className="venue" id="places-holder">
                    <a
                      rel="noreferrer"
                      href={googleMapUrl(key, item)}
                      target="_blank"
                    >
                      {item}
                    </a>
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
