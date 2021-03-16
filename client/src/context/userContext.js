import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "fetch_user":
      return action.payload || false;
    default:
      return state;
  }
};

const fetchUser = (dispatch) => async (user) => {
  const res = user;

  dispatch({ type: "fetch_user", payload: res.data });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { fetchUser },
  null
);
