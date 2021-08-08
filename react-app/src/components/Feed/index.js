import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestFeed, postDestFeed } from "../../store/destination";
import { getComments } from "../../store/comment";
import envVars from "../../config";
import EditPostBtn from "./EditPostBtn";
import Comments from "../Comments";
import Modal from "./Modal";
import "./Feed.css";
import axios from "axios";

function Feed({ payload, place }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [body, setBody] = useState("");
  const [qData, setQData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const client_id = envVars.client_id;
  const client_secret = envVars.client_secret;

  const user = useSelector((state) => state.session)?.user;
  const destinationFeed = useSelector((state) =>
    Object.values(state.destination)
  );
  const postComments = useSelector((state) => Object.values(state.comments));
  const modalData = qData?.response?.groups[0].items;

  const landmarks = async () => {
    const res = await axios(
      `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}`
    );
    setQData(res.data);
    setShowModal(true);
    return;
  };
  const bars = async () => {
    const res = await axios(
      `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}&query=bars`
    );
    setQData(res.data);
    setShowModal(true);
    return;
  };
  const nightlife = async () => {
    const res = await axios(
      `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}&query=nightlife`
    );
    setQData(res.data);
    setShowModal(true);
    return;
  };
  const hotels = async () => {
    const res = await axios(
      `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}&query=hotels`
    );
    setQData(res.data);
    setShowModal(true);
    return;
  };
  const restaurants = async () => {
    const res = await axios(
      `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=20&near=${place}&query=restaurants`
    );
    setQData(res.data);
    setShowModal(true);
    return;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postDestFeed({ loc_id: payload, body, user_id: user.id }));
    setBody("");
  };


  useEffect(() => {
    dispatch(getDestFeed(payload));
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!modalRef?.current?.contains(e.target)) {
        setShowModal(false);
      }
    });
  });
  useEffect(()=>{
      dispatch(getComments(payload))
  }, [dispatch])

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
        <button className="feed-button" type="submit"></button>
      </form>
      <div className="big-container">
        <div className="left-side">
          <div className="left-side-holder">
            <div className="left-button-holder">
              <button className="landmarks" onClick={() => landmarks()}>
                landmarks
              </button>

              <button className="restaurants" onClick={() => restaurants()}>
                restaurants
              </button>
              <button className="hotels" onClick={() => hotels()}>
                hotels
              </button>
              <button className="nightlife" onClick={() => nightlife()}>
                nightlife
              </button>
              <button className="bars" onClick={() => bars()}>
                bars
              </button>
                {showModal && <div className="modal-container"></div>}
              <div ref={modalRef}>
                {showModal && qData && <Modal data={modalData}  />}
              </div>
            </div>
          </div>
          {/* <div className="venue-info">
            {data &&
              data.response.venues.map((item, index) => (
                <div key={index}>
                  <div className="venue-name">{item.name}</div>
                  <div className="venue-address">
                    {item.location.formattedAddress}
                  </div>
                </div>
              ))}
          </div> */}
        </div>
        <div className="feed-holder">
          <div className="feed-qs">
            {destinationFeed &&
              destinationFeed.map((feed) => (
                <div className="post-container">
                  <div className="feed-item">
                    <div className="feed-text">
                      <div className="post-text">{feed.body}</div>
                      <EditPostBtn id={feed.id} payload={payload} />
                    </div>
                    <Comments comments={postComments} feed={feed} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="right-side">hi</div>
      </div>
    </div>
  );
}

export default Feed;
