import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comment";

function EditComment({ comment }) {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(editComment(comment.id, newComment));
    setNewComment("");
  };

    useEffect(() => {
    dispatch(editComment(comment.id, newComment));
    }, [dispatch])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Edit Comment"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type='submit' >Post</button>
      </form>
    </div>
  );
}

export default EditComment;
