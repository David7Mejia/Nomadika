/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "../EditPost";
import { deleteDestPost, getDestFeed } from "../../store/destination";
import "./Feed.css";

function EditPostBtn({ id, payload }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const dispatch = useDispatch();

  //ELIPSES BUTTON
  const showMenu = () => {
    if (openMenu) return;
    setOpenMenu(true);
  };

  const hideMenu = () => {
    if (!openMenu) return;
    setOpenMenu(false);
  };

  //EDIT BUTTON
  const showEdit = () => {
    if (openEdit) return;
    setOpenEdit(true);
  };

  const hideEdit = () => {
    if (!openEdit) return;
    setOpenEdit(false);
  };

  useEffect( () => {
     dispatch(getDestFeed(payload));
  }, [payload, dispatch]);

  const deletePost = (id) => {
    dispatch(deleteDestPost(id));
    dispatch(getDestFeed(payload));
  };


  return (
    <div className="edit-menu-div">
      <button
        onClick={openMenu === true ? hideMenu : showMenu}
        className="edit-menu"
      ></button>
      {openMenu && (
        <div className="edit-menu-wrapper">
          <button
            onClick={openEdit === true ? hideEdit : showEdit}
            // className="real-edit-button"
            className="cmt-edit-button"
          >
            {/* Edit */}
          </button>
          <button onClick={() => deletePost(id)}
            className="cmt-delete-button"
          >
            {/* Delete */}
          </button>
          {openEdit && <EditPost id={id} payload={payload} />}
        </div>
      )}
    </div>
  );
}

export default EditPostBtn;
