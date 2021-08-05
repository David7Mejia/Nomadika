const DEST_FEED = "destination/DEST_FEED";
const POST_FEED = "destination/POST_FEED";
const DELETE_POST = "destination/DELETE_POST";

//**********Actions**********//
export const postFeed = (payload) => ({
  type: POST_FEED,
  payload,
});

export const destFeed = (payload) => ({
  type: DEST_FEED,
  payload,
});

export const deleteFeed = (payload) => ({
  type: DELETE_POST,
  payload,
});


//**********THUNKS**********//
export const getDestFeed = (payload) => async (dispatch) => {
  const res = await fetch(`/api/cities/${payload}`);
  if (res.ok) {
    const dest = await res.json();
    dispatch(destFeed(dest));
    return dest;
  }
};

export const postDestFeed = (payload) => async (dispatch) => {
  const res = await fetch(`/api/cities/${payload.loc_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const newFeed = await res.json();
  dispatch(postFeed(newFeed));
};

export const updateDestFeed = (id, body) => async (dispatch) => {
  const res = await fetch(`/api/cities/${id}/${body}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const updatePost = await res.json();
    dispatch(destFeed(updatePost));
  }
};

export const deleteDestPost = (id) => async (dispatch) => {
const res = await fetch(`/api/cities/${id}`, {
  method: "DELETE",
  body: JSON.stringify({id}),
})
  if (res.ok) {
    await res.json();
    dispatch(deleteFeed(id));
    return res;
  }
};

const initialState = { thing: "" };

const destinationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case DEST_FEED:
      [action.payload].forEach((loc) => {
        newState[loc.id] = loc;
      });
      return {
        ...newState,
      };
    case POST_FEED:
      newState = {
        ...state,
        [action.payload.loc_id]: action.payload.body,
      };
      return newState;
    case DELETE_POST:
      newState = { ...state };
      delete newState[action.id]
      return { ...newState };
    default:
      return state;
  }
};

export default destinationReducer;
