import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComment from '../PostComment'
import "./Comments.css";
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import { getComments } from "../../store/comment";

function Comments({ feed }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => Object.values(state.comments));

  console.log("FUCCKKKKKK", comments);
  useEffect(() => {
    dispatch(getComments(feed.id));
  }, [dispatch]);

  return (
    <>
      <div className="comments-comp-container">
        {comments &&
          comments?.map((comment) => (
            <div className="single-comment-container">
              <div className="single-comment" id="single-comment">
                {comment && comment.feed_id == feed.id && (
                  <>
                    <div className="layout-comment-buttons">
                      {comment.comment}
                    </div>
                    <div className="button-holder">
                      <EditButton comment={comment} feed={feed} />
                      <DeleteButton comment={comment} feed={feed} />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <PostComment feed={feed} />
    </>
  );
}

export default Comments;
