import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComment from '../PostComment'
import { deleteComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import "./Comments.css";

function Comments({ comments, feed }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const dispatch = useDispatch();

  const showMenu = () => {
    if (openMenu) return;
    setOpenMenu(true);
  };
  const hideMenu = () => {
    if (!openMenu) return;
    setOpenMenu(false);
  };
  const showEdit = () => {
    if (editComment) return;
    setEditComment(true);
  };
  const hideEdit = () => {
    if (!editComment) return;
    setEditComment(false);
  };

  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
    dispatch(getDestFeed(feed.loc_id));
  };

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
              <div
                // contentEditable={editComment}
                className="single-comment"
                id="single-comment"
              >
                {comment.comment}
              </div>
              <div>
                <button className="cmt-edit-button">Edit</button>
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
