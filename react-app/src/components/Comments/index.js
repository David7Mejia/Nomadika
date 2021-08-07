import React from "react";
import PostComment from '../PostComment'
import "./Comments.css";
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

function Comments({ comments, feed }) {


  return (
    <>
      <div className="comments-comp-container">
        {comments &&
          comments?.map((comment) => (
            <div className="single-comment-container">
              <div className="single-comment" id="single-comment">
                {comment && comment.feed_id === feed.id && (
                  <>
                  <div className='layout-comment-buttons'>
                   { comment.comment}
                  </div>
                  <div className='button-holder'>
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
