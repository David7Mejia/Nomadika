/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import "./Comments.css";
function EditComment({ comment, feed }) {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment(comment.id, newComment));
    dispatch(getDestFeed(feed.loc_id));
    setNewComment("");
  };

  return (
    <form onSubmit={onSubmit} className="edit-comment-form">
      <input
        placeholder="Edit Comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        style={{height: '20px'}}
      />
      <button type="submit" className="upload-btn">
        Post
      </button>
    </form>
  );
}

export default EditComment;
