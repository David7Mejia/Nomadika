import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComment from '../PostComment'
import { deleteComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import "./Comments.css";
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

function Comments({ comments, feed }) {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
    dispatch(getDestFeed(feed.loc_id));
  };

  // useEffect(() => {
  //   deleteHandler();
  //   dispatch(getDestFeed(feed.loc_id));
  // }, [dispatch]);

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
                <EditButton comment={comment} feed={ feed} />
                <DeleteButton comment={comment} feed={feed}/>
              </div>
            </div>
          ))}
      </div>
      <PostComment feed={feed} />
    </>
  );
}

export default Comments;
