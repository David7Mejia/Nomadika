// import React from "react";
// import {  useDispatch } from "react-redux";
// import { deleteComment } from "../../store/comment";
// import { getDestFeed } from "../../store/destination";
// import "./Comments.css";

// function DeleteButton({ feed, comment }) {
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   // }, [dispatch, feed.loc_id]);

//   const deleteHandler = (id) => {
//     dispatch(deleteComment(id));
//     dispatch(getDestFeed(feed.loc_id));
//   };

//   useEffect(() => {}, []);
//   return (
//     <div>
//       <button
//         className="cmt-delete-button"
//         onClick={() => deleteHandler(comment.id)}
//       >
//       </button>
//     </div>
//   );
// }

// export default DeleteButton;
