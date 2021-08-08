import React, {  useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { newComment } from "../../store/comment";

import "./PostComment.css";

function PostComment({ feed }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session)?.user;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newComment({
        loc_id: feed.loc_id,
        comment: comment,
        feed_id: feed.id,
      })
    );
    setComment("");
  };
const userChecks = () => {
  if (!user) {
    alert("Please log in to comment");
  }
};
  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <input
        label="add a comment"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input-stretch"
        required
      ></input>
      <button className="stretch-btn" type="submit" onClick={userChecks}>
      </button>
    </form>
  );
}

export default PostComment;
