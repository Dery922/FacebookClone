import Cookies from "js-cookie";

export function useReducer(state = null, action) {
  state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  switch (action.type) {
    case "LOGIN":
      return action.payload;
    default:
      return state;
  }
}
