import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../store/comment";
import { getDestFeed } from "../../store/destination";
import axios from "axios";
import envVars from "../../config";
import "./Modal.css";

function Modal({ data }) {
  console.log(data);
  return (
    <div className='modal-container'>

    </div>
  );
}

export default Modal;
