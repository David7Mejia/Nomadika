import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Feed.css";
import { getDestFeed, postDestFeed } from "../../store/destination";

function Feed({ payload }) {
  const dispatch = useDispatch();
  const destinationFeed = useSelector((state) =>
    Object.values(state.destination)
  );
  const qs = destinationFeed[0].feeds;
  const [body, setBody] = useState("");

  // console.log("*****************", body);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postDestFeed({loc_id: payload, body}));
    setBody("");
  };

  useEffect(() => {
    if (payload) {
      dispatch(getDestFeed(payload));
    }
  }, [dispatch, payload]);

  return (
    <div>
      <form className="feed-container" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ask around!"
          className="feed-form"
          value={body}
          onChange={e => setBody(e.target.value)}
        ></input>
        <button className="feed-button" type="submit">
          Post
        </button>
      </form>
      <div className="feed-holder">
        <div className="feed-qs">
          {qs && qs.map((feed) => <div className="feed-item">{feed.body}</div>)}
        </div>
      </div>
    </div>
  );
}

export default Feed;
