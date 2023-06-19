import { put, takeLatest, call } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { EDIT_PROFILE } from './constants';
import { editProfileSuccess, editProfileError } from './actions';

function* editProfileSaga({ payload }) {
  try {
    const response = yield call(axios.put, '/auth/updateProfile', payload.formData, {
      headers: {
        Authorization: `Bearer ${payload.authToken}`,
      },
    });

    const responseData = yield response.json();

    yield put(editProfileSuccess(responseData));
  } catch (error) {
    yield put(editProfileError(error));
  }
}

export default function* watchEditProfileSaga() {
  yield takeLatest(EDIT_PROFILE, editProfileSaga);
}
