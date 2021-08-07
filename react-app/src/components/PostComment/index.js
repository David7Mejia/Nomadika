import React, {  useState } from "react";
import {  useDispatch } from "react-redux";
import { newComment } from "../../store/comment";

import "./PostComment.css";

function PostComment({ feed }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newComment({
        comment: comment,
        feed_id: feed.id,
      })
    );
    setComment("");
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
      <button className="stretch-btn" type="submit">
      </button>
    </form>
  );
}

export default PostComment;
