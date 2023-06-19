import produce from 'immer';
import {
  LOGIN_SUCCESS,
  VERIFY_SUCCESS,
  SET_WALLET_ADDRESS,
  LOGOUT,
  SET_LOADER,
  SIGN_UP_SUCCESS,
  SIGN_UP_SOCIAL_SUCCESS,
  DASHBOARD_SUCCESS,
  BRAND_DASHBOARD_SUCCESS,
  EDIT_PROFILE_SUCCESS,
} from './constants';

const INITIAL_STATE = {
  user: null,
  updatedUser: null,
  dahboardUser: null,
  branddahboardUser: null,
  socialuser: null,
  token: null,
  loader: false,
  walletAddress: null,
  Verify: null,
};

const AuthReducer = produce((draft, action) => {
  switch (action.type) {
    case EDIT_PROFILE_SUCCESS:
      draft.user = action.payload.user;
      draft.updatedUser = action.payload.user;
      break;
    case LOGIN_SUCCESS:
      draft.user = action.payload.user;
      draft.token = action.payload.token;
      break;
    case VERIFY_SUCCESS:
      draft.Verify = action.payload;

      break;
    case DASHBOARD_SUCCESS:
      draft.dahboardUser = action.payload;

      break;
    case BRAND_DASHBOARD_SUCCESS:
      draft.branddahboardUser = action.payload;

      break;
    case SIGN_UP_SUCCESS:
      draft.user = action.payload.user;
      draft.token = action.payload.token;

      break;
    case SIGN_UP_SOCIAL_SUCCESS:
      draft.user = action.payload.user;
      draft.token = action.payload.token;

      break;
    case SET_LOADER:
      draft.loader = action.payload;
      break;
    case SET_WALLET_ADDRESS:
      draft.walletAddress = action.payload;
      break;
    case LOGOUT:
      draft.user = null;
      draft.token = null;
      break;
    default:
  }
}, INITIAL_STATE);

export default AuthReducer;
