import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Feed.css";
import { getDestFeed } from "../../store/destination";

function Feed({ payload, destId }) {
  const dispatch = useDispatch();
  const destinationFeed = useSelector((state) =>
    Object.values(state.destination)
  );
  const qs = destinationFeed[0].feeds;

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch();
  //   dispatch(getFeedThunk());
  // };

  useEffect(() => {
    if (payload) {
      dispatch(getDestFeed(payload));
    }
  }, [dispatch, payload]);

  return (
    <div>
      <form className="feed-container">
        <input
          type="text"
          placeholder="Ask around!"
          className="feed-form"
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
