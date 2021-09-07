/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getDestFeed, postDestFeed } from "../../store/destination";
import { getComments } from "../../store/comment";
import EditPostBtn from "./EditPostBtn";
import Comments from "../Comments";
import Modal from "./Modal";
import "./Feed.css";
import axios from "axios";
import {getExtVenue} from "../../store/externalAPI";

function Feed({ payload, place }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [body, setBody] = useState("");
  const [qData, setQData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session)?.user;
  const bigData = useSelector((state) =>Object.values(state.venueAPI)) || [];

  const destinationFeed = useSelector((state) =>Object.values(state.destination));
  const postComments = useSelector((state) => Object.values(state.comments));

  const venue = async (e) => {
    const venueType = e.target.className;
    await dispatch(getExtVenue(venueType, place))
    // setQData(bigData);
    setShowModal(true);
  }
  // console.log('big data/qData/modalData',bigData, qData, modalData)

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return <Redirect to="/" />;
    }
    dispatch(postDestFeed({ loc_id: payload, body, user_id: user.id }));
    setBody("");
  };

  const userChecks = () => {
    if (!user) {
      alert("Please log in to post");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!modalRef?.current?.contains(e.target)) {
        setShowModal(false);
      }
    });
  });

  useEffect(() => {
    dispatch(getComments(payload));
  }, [dispatch, getComments, payload]);

  return (
    <div>
      <form className="feed-container" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ask around!"
          className="feed-form"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></input>
        <button
          className="feed-button"
          type="submit"
          onClick={userChecks}
        ></button>
      </form>
      <div className="big-container">
        <div className="left-side">
          <div className="left-side-holder">
            <div className="left-button-holder">
              <button className="landmarks" onClick={(e) => venue(e)}>
                landmarks
              </button>
              <button className="restaurants" onClick={(e) => venue(e)}>
                restaurants
              </button>
              <button className="hotels" onClick={(e) => venue(e)}>
                hotels
              </button>
              <button className="nightlife" onClick={(e) => venue(e)}>
                nightlife
              </button>
              <button className="bars" onClick={(e) => venue(e)}>
                bars
              </button>
              {showModal && <div className="modal-container"></div>}
              <div ref={modalRef}>
                {showModal && bigData && <Modal data={bigData} />}
              </div>
            </div>
          </div>
        </div>
        <div className="feed-holder">
          <div className="feed-qs">
            {destinationFeed &&
              destinationFeed.map((feed) => (
                <div className="post-container" key={feed.id}>
                  <div className="feed-item">
                    <div className="feed-text">
                      <div className="post-text">{feed.body}</div>
                      {user?.id === feed.user_id && (
                        <EditPostBtn id={feed.id} payload={payload} />
                      )}
                    </div>
                    <Comments comments={postComments} feed={feed} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="right-side">
          {/* <div className='right-side-holder'></div> */}
        </div>
      </div>
    </div>
  );
}

export default Feed;


// const landmarks = async () => {
//   const res = await axios(
//     `https://api.foursquare.com/v2/venues/explore?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=20&near=${place}`
//   );
//   setQData(res.data);
//   setShowModal(true);
//   return;
// };
// const bars = async () => {
//   const res = await axios(
//     `https://api.foursquare.com/v2/venues/explore?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=20&near=${place}&query=bars`
//   );
//   setQData(res.data);
//   setShowModal(true);
//   return;
// };
// const nightlife = async () => {
//   const res = await axios(
//     `https://api.foursquare.com/v2/venues/explore?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=20&near=${place}&query=nightlife`
//   );
//   setQData(res.data);
//   setShowModal(true);
//   return;
// };
// const hotels = async () => {
//       console.log("restaurants target ", e.target.className);

//   const res = await axios(
//     `https://api.foursquare.com/v2/venues/explore?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=20&near=${place}&query=hotels`
//   );
//   setQData(res.data);
//   setShowModal(true);
//   return;
// };
// const restaurants = async (e) => {
//   console.log('restaurants target ', e.target.className);
//   const res = await axios(
//     `https://api.foursquare.com/v2/venues/explore?client_id=WJ3ZGAO3NR4AASFCDD410HL5QQMA2A4J1QRCRKT2PKUDE3HY&client_secret=TFPMEMH2W5C44JERFOG1YHK2POVPTMIA3JRB4GKSYD2JUPX0&v=20180323&limit=20&near=${place}&query=restaurants`
//   );
//   setQData(res.data);
//   setShowModal(true);
//   return;
// };
