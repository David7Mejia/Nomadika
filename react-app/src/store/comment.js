const POST_COMMENT = "comment/POST_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

//******ACTIONS******//
export const postComment = (comment) => ({
  type: POST_COMMENT,
  comment,
});

export const deleteOneComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});


//******THUNKS******//
// POST
export const newComment = (newComment) => async (dispatch) => {
  const res = await fetch(`/api/comments/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
  if (res.ok) {
    const createdComment = await res.json();
    dispatch(postComment(createdComment));
    return createdComment;
  }
};

//DELETE
export const delComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (res.ok) {
    await res.json();
    dispatch(deleteOneComment(id));
    return res;
  }
};
// export const editComment = (id, comment) => async (dispatch) => {
//   const res = await fetch(`/api/comments/${id}/edit/${comment}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id, comment }),
//   });
//   if (res.ok) {
//     const newComment = await res.json();
//     dispatch(postComment(newComment));
//     return newComment;
//   }
// };

const initialState = { comment: "" };

const commentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    // case GET_COMMENTS:
    //   action.comment.forEach((comment) => {
    //     newState[comment.id] = comment;
    //   });
    //   return { ...newState };
    case POST_COMMENT:
      newState = {
        ...state,
        [action.comment.id]: action.comment,
      };
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.id];
      return { ...newState };
    default:
      return state;
  }
};
export default commentReducer;
