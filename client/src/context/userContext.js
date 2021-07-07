import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "fetch_user":
      return action.payload || false;
    case "logout":
      return null;
    default:
      return state;
  }
};

const fetchUser = (dispatch) => async (user) => {
  const res = user;
  // console.log("res context", res);
  const finalToken = `Bearer ${res.data.token}`;
  localStorage.setItem("token", finalToken);
  dispatch({ type: "fetch_user", payload: res.data });
};

const logout = (dispatch) => async () => {
  localStorage.removeItem("token");
  dispatch({ type: "logout" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { fetchUser, logout },
  null
);
