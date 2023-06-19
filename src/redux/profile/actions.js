import { EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_ERROR } from './constants';

export const editProfile = (payload) => ({
  type: EDIT_PROFILE,
  payload,
});

export const editProfileSuccess = (response) => ({
  type: EDIT_PROFILE_SUCCESS,
  response,
});

export const editProfileError = (error) => ({
  type: EDIT_PROFILE_ERROR,
  error,
});
