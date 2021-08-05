import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComment from '../PostComment'
import { deleteComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import "./Comments.css";
import EditButton from './EditButton'

function Comments({ comments, feed }) {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
    dispatch(getDestFeed(feed.loc_id));
  };
//hi
  useEffect(() => {
    deleteHandler();
    dispatch(getDestFeed(feed.loc_id));
  }, [dispatch]);

  return (
    <>
      <div className="comments-comp-container">
        {comments &&
          comments.map((comment) => (
            <div className="single-comment-container">
              <div className="single-comment" id="single-comment">
                {comment.comment}
              </div>
              <div className='edit-del-holder'>
                <EditButton comment={comment} />
                <button
                  className="cmt-delete-button"
                  onClick={() => deleteHandler(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <PostComment feed={feed} />
    </>
  );
}

export default Comments;
