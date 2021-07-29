import React from "react";
import "./Feed.css";

function Feed() {
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch();
  //   dispatch(getFeedThunk());
  // };
  return (
    <div>
      <form calssName="feed-container">
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
