import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "./AuthActions";

const initialState = {
  error: null,
  loading: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.data
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
