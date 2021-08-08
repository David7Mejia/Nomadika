import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PostComment from '../PostComment'
import "./Comments.css";
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import { getDestFeed } from "../../store/destination";
import { deleteComment } from "../../store/comment";
import {getComments} from '../../store/comment'
function Comments({ feed }) {
  const dispatch = useDispatch()
  const comments = useSelector(state => Object.values(state.comments))



const deleteHandler = async(id) => {
  await dispatch(deleteComment(id));
  dispatch(getComments(feed.loc_id))
 };
  return (
    <>
      <div className="comments-comp-container">
        {comments &&
          comments?.map((comment) => (
            <div className="single-comment-container" key={comment.id}>
              <div className="single-comment" id="single-comment">
                {comment && comment.feed_id === feed.id && (
                  <>
                    <div className="layout-comment-buttons">
                      {comment.comment}
                    </div>
                    <div className="button-holder">
                      <EditButton comment={comment} feed={feed} />
                      <button
                        className="cmt-delete-button"
                        onClick={() => deleteHandler(comment.id)}
                      ></button>
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
