import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import EditComment from "./EditComment";

function EditButton({ comment }) {
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
          Edit
        </button>
        {editComment && <EditComment comment={comment} />}
      </div>
  );
}

export default EditButton;
