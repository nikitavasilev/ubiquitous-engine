import { EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR } from './constants';

const initialState = {
  loading: false,
  error: null,
  response: null,
};

const editProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, loading: true, error: null, response: null };
    case EDIT_PROFILE_SUCCESS:
      return { ...state, loading: false, response: action.response };
    case EDIT_PROFILE_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default editProfileReducer;
