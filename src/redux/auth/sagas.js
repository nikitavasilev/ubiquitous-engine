import axios from '../../utils/axios';
import { all, fork, put, takeLatest, select } from 'redux-saga/effects';
import {
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SIGN_UP,
  SIGN_UP_SOCIAL,
  UPDATE_EMAIL,
  CHANGE_PASSWORD,
  DASHBOARD,
  BRAND_DASHBOARD,
  VERIFY,
  EMAIL_RESEND,
  EDIT_PROFILE_REQUEST,
} from './constants';

import {
  loginSuccess,
  signupSuccess,
  signupsocialSuccess,
  setLoader,
  dashboardSuccess,
  branddashboardSuccess,
  editProfileSuccess,
} from './actions';

import { makeSelectAuthToken } from 'store/Selector';

import { sagaErrorHandler } from '../../shared/helperMethods/sagaErrorHandler';
import { setNotification } from '../../shared/helperMethods/setNotification';

function* loginUser({ payload }) {
  try {
    let data = {
      email: payload.email,
      password: payload.password,
    };
    const response = yield axios.post(`/auth/login`, data);
    yield put(setLoader(false));
    yield setNotification('success', response.data.message);
    console.log('Server response:', JSON.stringify(response.data.data));
    yield put(loginSuccess(response.data.data));

    if (response.data.data.user.role == 'Super Admin' || 'Brand Admin') {
      payload.navigate('/home');
    } else {
      payload.navigate('/home');
    }
  } catch (error) {
    yield put(setLoader(false));
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* dashboard({}) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(`/adminDashboard`, headers);

    yield put(dashboardSuccess(response.data.data));
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* branddashboard({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(`/brandAdminDashboard/${payload.brandId}`, headers);

    yield put(branddashboardSuccess(response.data.data));
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* updateEmailRequest({ payload }) {
  let data = {
    email: payload.email,
  };
  try {
    const response = yield axios.put(`auth/signup/email-update?id=${payload.id}`, data);

    yield setNotification('success', response.data.message);
    payload.handleClose();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchUpdateEmail() {
  yield takeLatest(UPDATE_EMAIL, updateEmailRequest);
}

function* resendEmailRequest({ payload }) {
  try {
    // let data = ''
    const response = yield axios.post(`auth/resendCode?id=${payload.id}`);

    yield setNotification('success', response.data.message);
    payload.navigate('/emailVerify');
  } catch (error) {
    yield sagaErrorHandler(error.response.data);
  }
}

export function* watchresendEmail() {
  yield takeLatest(EMAIL_RESEND, resendEmailRequest);
}

function* signupUserRequest({ payload }) {
  try {
    let data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      walletAddress: payload.walletAddress,
      address: payload.address,
    };
    const response = yield axios.post(`/auth/signup`, data);

    yield put(setLoader(false));
    yield setNotification('success', response.data.message);
    yield put(signupSuccess(response.data.data));
    payload.navigate('/emailVerify');
  } catch (error) {
    yield put(setLoader(false));
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* signupSocialUserRequest({ payload }) {
  try {
    let data = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      walletAddress: payload.walletAddress,
      address: payload.address,
    };
    const response = yield axios.post(`/auth/socialSignup`, data);

    yield put(setLoader(false));
    yield setNotification('success', response.data.message);
    yield put(signupsocialSuccess(response.data.data));
    payload.navigate('/home');
  } catch (error) {
    yield put(setLoader(false));
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* forgetPasswordRequest({ payload }) {
  let data = {
    email: payload.email,
  };
  try {
    const response = yield axios.post(`auth/forgetPassword`, data);
    yield put(setLoader(false));
    yield setNotification('success', response.data.message);
    payload.navigate('/login');
  } catch (error) {
    yield put(setLoader(false));
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* resetPasswordRequest({ payload }) {
  let data = {
    newPassword: payload.newPassword,
    token: payload.token,
  };
  try {
    const response = yield axios.put(`auth/resetPassword`, data);

    yield setNotification('success', response.data.message);
    payload.navigate('/login');
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}
function* verifyRequest({ payload }) {
  let data = {
    token: payload.token,
  };
  try {
    const response = yield axios.put(`users/verify/email`, data);
    console.log(response, 'response');
    yield setNotification('success', response?.data?.message);
    if (data) {
      payload.navigate('/login');
    }
  } catch (error) {
    console.log(error, 'error');
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* changePasswordRequest({ payload }) {
  let data = {
    newPassword: payload.newPassword,
    currentPassword: payload.currentPassword,
  };
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };

    const response = yield axios.put(`auth/changePassword`, data, headers);
    yield setNotification('success', response.data.message);
    payload.navigate('/login');
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* editProfileSaga({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`/auth/updateProfile`, payload, headers);

    // console.log('Not Transformed user:', response.data.data);

    const transformedUser = {
      user: {
        id: response.data.data.user.dataValues.id,
        firstName: response.data.data.user.dataValues.firstName,
        lastName: response.data.data.user.dataValues.lastName,
        email: response.data.data.user.dataValues.email,
        walletAddress: response.data.data.user.dataValues.walletAddress,
        address: response.data.data.user.dataValues.address,
        isVerified: response.data.data.user.dataValues.isVerified,
        UserProfile: {
          profileImg: response.data.data.userProfile.profileImg,
          bannerImg: response.data.data.userProfile.bannerImg,
          description: response.data.data.userProfile.description,
        },
      },
    };

    // console.log('Transformed userBIS:', JSON.stringify(transformedUser));

    yield put(editProfileSuccess(transformedUser));
    yield setNotification('success', response.data.message);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.data) {
      yield sagaErrorHandler(error.response.data.data);
    } else {
      console.log(error);
    }
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, loginUser);
}
export function* watchDashboard() {
  yield takeLatest(DASHBOARD, dashboard);
}
export function* watchBrandDashboard() {
  yield takeLatest(BRAND_DASHBOARD, branddashboard);
}

export function* watchSignup() {
  yield takeLatest(SIGN_UP, signupUserRequest);
}
export function* watchSocialSignup() {
  yield takeLatest(SIGN_UP_SOCIAL, signupSocialUserRequest);
}

export function* watchForgot() {
  yield takeLatest(FORGOT_PASSWORD, forgetPasswordRequest);
}

export function* watchReset() {
  yield takeLatest(RESET_PASSWORD, resetPasswordRequest);
}
export function* watchVerify() {
  yield takeLatest(VERIFY, verifyRequest);
}
export function* watchchangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordRequest);
}

export function* watchEditProfile() {
  yield takeLatest(EDIT_PROFILE_REQUEST, editProfileSaga);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchVerify),

    fork(watchForgot),
    fork(watchReset),

    fork(watchSignup),
    fork(watchUpdateEmail),
    fork(watchresendEmail),
    fork(watchSocialSignup),
    fork(watchchangePassword),
    fork(watchDashboard),
    fork(watchBrandDashboard),

    fork(watchEditProfile),
  ]);
}
