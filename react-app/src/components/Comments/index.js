import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostComment from '../PostComment'
import "./Comments.css";

function Comments({ comments, feed }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [showBtns, setShowBtns] = useState(false);


  const showMenu = () => {
    if (openMenu) return;
    setOpenMenu(true);
  }

  const hideMenu = () => {
    if (!openMenu) return;
    setOpenMenu(false);
  }

  const changeEdit = () => {
    if (showBtns) {
      return false
    } else {
      setShowBtns(true);
    }
  }



  return (
    <div className="comments-comp-container">
      {comments &&
        comments.map((comment) =>
          <div className='single-comment-container'>
          <div contentEditable={changeEdit} className='single-comment' >
            {comment.comment}
            </div>
            <button
              className='elipses'
              onClick={openMenu ? hideMenu : showMenu}
              >...</button>
              {/* {openMenu &&(


                )} */}
          </div>)}
      <PostComment feed={feed} />
    </div>
  );
}

export default Comments;
