import { DEST_FEED as GET_COMMENTS } from './destination'
const POST_COMMENT = "comment/POST_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";
// const GET_COMMENTS = "comment/GET_COMMENTS";

//******ACTIONS******//
export const getComment = (comment) => ({
  type: GET_COMMENTS,
  comment
})

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
// export const getComments = (payload) => async (dispatch) => {
//   const res = await fetch(`/api/comments/${payload}`)

//   if (res.ok) {
//     const comments = await res.json();
//     dispatch(getComment(comments));
//     return comments
//   }
// }


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
export const deleteComment = (id) => async (dispatch) => {
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

//EDIT
export const editComment = (id, comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}/${comment}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, comment }),
  });
  if (res.ok) {
    const editedCmt = await res.json();
    dispatch(postComment(editedCmt));
    return editedCmt;
  }
};


//******REDUCER******//

const initialState = { comment: "" };

const commentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_COMMENTS:
       action?.payload?.feeds[0]?.comments.forEach((cmt) => {
        newState[cmt.id] = cmt;
      });
      return {
        ...state,
        ...newState,
      };
    case POST_COMMENT:
      newState = {
        ...state,
        [action?.comment.id]: action.comment,
      };
      return newState;
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.id];
      return newState ;
    default:
      return state;
  }
};
export default commentReducer;
