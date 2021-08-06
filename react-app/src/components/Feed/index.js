import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDestFeed, postDestFeed } from "../../store/destination";
import EditPostBtn from "./EditPostBtn";
import Comments from "../Comments";
import "./Feed.css";

function Feed({ payload, data }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");

  const user = useSelector((state) => state.session)?.user;
  const destinationFeed = useSelector((state) => Object.values(state.destination));
  const postComments = useSelector((state) => Object.values(state.comments));


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postDestFeed({ loc_id: payload, body, user_id: user.id }));
    setBody("");
  };

  useEffect(() => {
    dispatch(getDestFeed(payload));
  }, [dispatch]);



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
        ></button>
      </form>
      <div className="big-container">
        <div className="left-side">
          <div className="venue-info">
            {data &&
              data.response.venues.map((item, index) => (
                <div key={index}>
                  <div className="venue-name">{item.name}</div>
                  <div className="venue-address">
                    {/* {item.location.formattedAddress} */}
                  </div>
                </div>
              ))}
          </div>
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
                    {/* <Comments comments={postComments} feed={feed} /> */}
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
