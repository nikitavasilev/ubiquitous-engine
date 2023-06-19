import axios from '../../utils/axios';
import { all, fork, put, takeLatest ,select } from 'redux-saga/effects';
import { GET_ALL_LANDING_PAGE_DATA, GET_NFT_DATA , BMW } from './constants';
import { getAllLandingPageDataSuccess, getnftDataSuccess , bmwPageSuccess } from './actions';
import { sagaErrorHandler } from '../../shared/helperMethods/sagaErrorHandler';
import { setNotification } from '../../shared/helperMethods/setNotification';
import { makeSelectAuthToken } from 'store/Selector';
function* getAllLandingPageDataRequest() {
    try {
        const response = yield axios.get(`/marketplace`);
        yield put(getAllLandingPageDataSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllLandingPageData() {
    yield takeLatest(GET_ALL_LANDING_PAGE_DATA, getAllLandingPageDataRequest);
}
function* getNftDataRequest({ payload }) {
    try {
        const response = yield axios.get(`/nft/${payload.id}`);
        yield put(getnftDataSuccess(response.data.data));
        console.log(response, 'RESPONSE=>nft???')
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetNftData() {
    yield takeLatest(GET_NFT_DATA, getNftDataRequest);
}
function* getBMWDataRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`dynamicBrandData?BrandId=${payload.BrandId}` , headers);
        yield put(bmwPageSuccess(response.data.data));
        console.log(response.data.data, 'response===>')
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
        console.log(error, 'error===>')

    }
}

export function* watchGetbmwData() {
    yield takeLatest(BMW, getBMWDataRequest);
}

export default function* landingPageSaga() {
    yield all([fork(watchGetAllLandingPageData), fork(watchGetNftData) , fork(watchGetbmwData)]);
}
