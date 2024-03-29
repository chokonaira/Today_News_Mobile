import * as types from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: [],
  errors: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case types.DISMISS_AUTH_ERROR:
      return {
        ...state,
        errors: undefined,
      };
    case types.LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: false,
        user: [],
        errors: null,
      };
    default:
      return state;
  }
}
