import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Feed.css";
import { getDestFeed } from "../../store/destination";

function Feed({ payload, destId }) {
  const dispatch = useDispatch();

  const destinationFeed = useSelector((state) =>
    Object.values(state.destination)
  );

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch();
  //   dispatch(getFeedThunk());
  // };

  // console.log("***********************FEED", typeof(payload));

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
      </form>
    </div>
  );
}

export default Feed;
