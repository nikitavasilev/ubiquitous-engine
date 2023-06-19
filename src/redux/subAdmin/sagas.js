import axioss from 'axios';
import axios from 'utils/axios';
import { all, fork, put, takeLatest, select } from 'redux-saga/effects';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { makeSelectAuthToken } from 'store/Selector';
import { getAllSubAdminList, getAllSubAdminListSuccess } from './actions';
import {
    GET_ALL_SUBADMIN_LIST,
    ADD_SUBADMIN,
    UPDATE_SUBADMIN,
    DELETE_SUBADMIN,
    CHANGE_SUBADMIN_STATUS,
    CHANGE_ROLE,
    CHANGE_SUBADMIN_MINTING_ACCESS,
    ASSIGN_BRANDCATEGORY
} from './constants';
import { setNotification } from 'shared/helperMethods/setNotification';

function* getAllSubAdminListRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`admin?size=${payload.limit}&page=${payload.page}&search=${payload.search}`, headers);
        yield put(getAllSubAdminListSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllSubAdminList() {
    yield takeLatest(GET_ALL_SUBADMIN_LIST, getAllSubAdminListRequest);
}

function* addSubAdminRequest({ payload }) {
    let data = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        walletAddress: payload.walletAddress,
        brandCategory: payload.brandCategory,
        hasMintingAccess: true
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`admin`, data, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddSubAdmin() {
    yield takeLatest(ADD_SUBADMIN, addSubAdminRequest);
}
function* updateSubAdminRequest({ payload }) {
    let data = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        walletAddress: payload.walletAddress
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`admin/${payload.id}`, data, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateSubAdmin() {
    yield takeLatest(UPDATE_SUBADMIN, updateSubAdminRequest);
}
function* assignBrandCategoryRequest({ payload }) {
    let data = {
        brandCategory: payload.brandCategory,
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`admin/assignBrandCategory/${payload.id}`, data, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAssignBrandCategory() {
    yield takeLatest(ASSIGN_BRANDCATEGORY, assignBrandCategoryRequest);
}

function* deleteSubAdminRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.delete(`admin/${payload.id}`, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteSubAdmin() {
    yield takeLatest(DELETE_SUBADMIN, deleteSubAdminRequest);
}

function* changeSubAdminStatusRequest({ payload }) {
    
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`admin/${payload.id}`,{}, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeSubAdminStatus() {
    yield takeLatest(CHANGE_SUBADMIN_STATUS, changeSubAdminStatusRequest);
}
function* changeSubadminRoleRequest({ payload }) {
    
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`/admin/changeRole/${payload.id}`,{}, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeSubAdminRole() {
    yield takeLatest(CHANGE_ROLE, changeSubadminRoleRequest);
}

function* changeSubAdminMintingAccessRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.patch(`admin/mint/${payload.id}`, {}, headers);
        yield put(
            getAllSubAdminList({
                page: payload.page,
                limit: payload.limit,
                search: payload.search
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchChangeSubAdminMintingAccess() {
    yield takeLatest(CHANGE_SUBADMIN_MINTING_ACCESS, changeSubAdminMintingAccessRequest);
}

export default function* subAdminSaga() {
    yield all([
        fork(watchGetAllSubAdminList),
        fork(watchAddSubAdmin),
        fork(watchUpdateSubAdmin),
        fork(watchDeleteSubAdmin),
        fork(watchChangeSubAdminStatus),
        fork(watchChangeSubAdminRole),
        fork(watchChangeSubAdminMintingAccess),
        fork(watchAssignBrandCategory)
    ]);
}
