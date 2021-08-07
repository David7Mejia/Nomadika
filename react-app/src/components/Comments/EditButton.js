import React, {  useState } from "react";

import "./Comments.css";
import EditComment from "./EditComment";

function EditButton({ comment, feed }) {
  const [editComment, setEditComment] = useState(false);

  const showEdit = () => {
    if (editComment) return;
    setEditComment(true);
  };
  const hideEdit = () => {
    if (!editComment) return;
    setEditComment(false);
  };

  return (
      <div>
        <button
          className="cmt-edit-button"
          onClick={editComment === true ? hideEdit : showEdit}
        >
        </button>
        {editComment && <EditComment comment={comment} feed={feed}/>}
      </div>
  );
}

export default EditButton;
