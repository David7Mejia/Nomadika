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
import { getExtVenue } from "../../store/externalAPI";
import MyPlaces from "./MyPlaces";

function Feed({ payload, place }) {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [body, setBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session)?.user;
  const bigData = useSelector((state) =>Object.values(state.venueAPI)) || [];
  const destinationFeed = useSelector((state) =>Object.values(state.destination));
  const postComments = useSelector((state) => Object.values(state.comments));

  const venue = async (e) => {
    const venueType = e.target.className;
    await dispatch(getExtVenue(venueType, place))
    setShowModal(true);
  }

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
                {showModal && bigData && <Modal data={bigData} payload={payload} />}
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
          <div className="right-side-holder">
            <div className="modal-venues">
              MY PLACES
              {payload &&
              <MyPlaces payload={payload}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
