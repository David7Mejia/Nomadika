const POST_LOCATION = "location/POST_LOCATION";

export const newLocation = (payload) => ({
  type: POST_LOCATION,
  payload,
});

export const postLocation = (payload) => async (dispatch) => {
  console.log("*******LOCATION THUNK PAYLOAD", payload);

  const res = await fetch(`/api/cities/${payload.api_id}/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("*******LOCATION THUNK RES", res);

  const newLoc = await res.json();
  dispatch(newLocation(newLoc));
};

const initialState = { thing: "" };

const locationReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case POST_LOCATION:
      newState = {
        ...state,
        [action.payload.id]: action.payload,
      };
      return newState;
    default:
      return state;
  }
};
export default locationReducer;
