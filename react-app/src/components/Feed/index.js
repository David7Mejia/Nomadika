import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestFeed, postDestFeed } from "../../store/destination";
import EditPostBtn from "./EditPostBtn";
import Comments from '../Comments'
import "./Feed.css";

function Feed({ payload }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session).user;
  const destinationFeed = useSelector((state) =>
    Object.values(state.destination)
  );
  const qs = destinationFeed[0].feed?.feeds;

  console.log("DESTINATIONFEED", destinationFeed);
  // const postComment = destinationFeed[0].comments;
  const [body, setBody] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postDestFeed({ loc_id: payload, body, user_id: user.id }));
    dispatch(getDestFeed(payload));
    setBody("");
  };

  useEffect(() => {
    if (payload) {
      dispatch(getDestFeed(payload));
    }
  }, [payload]);

  const getSubmitBtn = () => {
    dispatch(getDestFeed(payload));
  };

  return (
    <div>
      <form className="feed-container" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ask around!"
          className="feed-form"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></input>
        <button className="feed-button" type="submit" onClick={getSubmitBtn}>
          Post
        </button>
      </form>
      <div className="big-container">
        <div className="left-side">hello</div>
        <div className="feed-holder">
          <div className="feed-qs">
            {qs &&
              qs.map((feed) => (
                <div className="feed-item">
                  <div className="feed-item">
                    {feed.body}
                    <EditPostBtn id={feed.id} payload={payload} />
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
