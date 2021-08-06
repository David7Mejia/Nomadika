import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";

function EditComment({ comment, feed }) {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment(comment.id, newComment));
    dispatch(getDestFeed(feed.loc_id));
    setNewComment("");
  };

  // useEffect(() => {
  //   dispatch(editComment(comment.id, newComment));
  //   dispatch(getDestFeed(feed.loc_id));
  // }, [dispatch]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Edit Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default EditComment;
