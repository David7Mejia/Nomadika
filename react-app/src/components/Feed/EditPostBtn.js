import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux'
import EditPost from '../EditPost'

function EditPostBtn({ id, payload}) {
    const [openMenu, setOpenMenu] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const dispatch = useDispatch()

  //ELIPSES BUTTON
    const showMenu = () => {
        if (openMenu) return
        setOpenMenu(true)
    }

    const hideMenu = () => {
        if (!openMenu) return
        setOpenMenu(false)
    }

    // useEffect(() => {
    //     if (!openMenu) return;
    //      const hideMenu = () => {
    //        setOpenMenu(false);
    //      };
    //     document.removeEventListener('click', hideMenu)
    // }, [openMenu])

//EDIT BUTTON
  const showEdit = () => {
    if (openEdit) return
    setOpenEdit(true)
  }

  const hideEdit = () => {
    if (!openEdit) return
    setOpenEdit(false)
  }


    return (
      <div>
        <button
          onClick={openMenu === true ? hideMenu : showMenu}
          className="edit-menu"
        >
          ...
        </button>
        {openMenu && (
          <div className="edit-menu-wrapper">
            <button
              onClick={openEdit === true ? hideEdit : showEdit}
            >
              Edit
            </button>
            {openEdit && <EditPost id={id} payload={payload}/>}
          </div>
        )
        }
      </div>
    )
}

export default EditPostBtn;
