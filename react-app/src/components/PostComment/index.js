import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { newComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";

import "./PostComment.css";

function PostComment({ feed }) {
  const [comment, setComment] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { ids } = useParams();

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
        Post
      </button>
    </form>
  );
}

export default PostComment;
