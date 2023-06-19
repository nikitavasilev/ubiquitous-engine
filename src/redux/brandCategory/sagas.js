import axios from 'utils/axios';
import { all, fork, put, takeLatest, select } from 'redux-saga/effects';

import { makeSelectAuthToken } from 'store/Selector';
import { getAllBrandCategoriesAdminSuccess, getAllBrandCategories, getAllBrandCategoriesSuccess, getAllCategoriesDropdownSuccess, getAllBrandCategoriesByAdminSuccess } from './actions';
import {
    GET_ALL_BRAND_CATEGORIES,
    ADD_BRAND_CATEGORY,
    UPDATE_BRAND_CATEGORY,
    DELETE_BRAND_CATEGORY,
    GET_ALL_CATEGORIES_DROPDOWN,
    GET_ALL_BRAND_CATEGORIES_ADMIN,
    GET_ALL_BRAND_CATEGORIES_BY_ADMIN
} from './constants';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { setNotification } from 'shared/helperMethods/setNotification';

function* getAllCategoriesDropdownRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(`category/dropdown/${payload.brandId}`, headers);
        yield put(getAllCategoriesDropdownSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllCategoriesDropdown() {
    yield takeLatest(GET_ALL_CATEGORIES_DROPDOWN, getAllCategoriesDropdownRequest);
}

function* getAllBrandCategoriesByAdminRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `brand/${payload.brandId}/admin/${payload.adminId}/category?&size=${payload.limit}&page=${payload.page}&search=${payload.search}`,
            headers
        );
        yield put(getAllBrandCategoriesByAdminSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllBrandCategoriesByAdmin() {
    yield takeLatest(GET_ALL_BRAND_CATEGORIES_BY_ADMIN, getAllBrandCategoriesByAdminRequest);
}

function* getAllBrandCategoryRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `brand/${payload.brandId}/category?&size=${payload.limit}&page=${payload.page}&search=${payload.search}`,
            headers
        );
        yield put(getAllBrandCategoriesSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllBrandCategory() {
    yield takeLatest(GET_ALL_BRAND_CATEGORIES, getAllBrandCategoryRequest);
}
function* getAllBrandCategoryAdminRequest({ payload }) {
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.get(
            `brandCategory/dropdown`,
            headers
        );
        yield put(getAllBrandCategoriesAdminSuccess(response.data.data));
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchGetAllBrandCategoryAdmin() {
    yield takeLatest(GET_ALL_BRAND_CATEGORIES_ADMIN, getAllBrandCategoryAdminRequest);
}

function* addBrandCategoryRequest({ payload }) {
    let data = {
        brandId: payload.brandId,
        categoryId: payload.categoryId,
        profitPercentage: payload.profitPercentage,
        contractAddress: payload.contractAddress
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`brand/category`, data, headers);
        yield put(
            getAllBrandCategories({
                page: payload.page,
                limit: payload.limit,
                search: payload.search,
                brandId: payload.brandId
            })
        );
        payload.handleClose();
        // yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchAddBrandCategory() {
    yield takeLatest(ADD_BRAND_CATEGORY, addBrandCategoryRequest);
}

function* updateBrandCategoryRequest({ payload }) {
   
    let data = {
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        profitPercentage: payload.profitPercentage
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.put(`brand/category`, data, headers);
        yield put(
            getAllBrandCategories({
                page: payload.page,
                limit: payload.limit,
                search: payload.search,
                brandId: payload.brandId
            })
        );
        payload.handleClose();
        // yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchUpdateBrandCategory() {
    yield takeLatest(UPDATE_BRAND_CATEGORY, updateBrandCategoryRequest);
}

function* deleteBrandCategoryRequest({ payload }) {
    let data = {
        categoryId: payload.categoryId,
        brandId: payload.brandId
    };
    try {
        const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
        const response = yield axios.post(`brand/category/remove`, data, headers);
        yield put(
            getAllBrandCategories({
                page: payload.page,
                limit: payload.limit,
                search: payload.search,
                brandId: payload.brandId
            })
        );
        payload.handleClose();
        yield setNotification('success', response.data.message);
    } catch (error) {
        yield sagaErrorHandler(error.response.data.data);
    }
}

export function* watchDeleteBrandCategory() {
    yield takeLatest(DELETE_BRAND_CATEGORY, deleteBrandCategoryRequest);
}

export default function* brandCategorySaga() {
    yield all([
        fork(watchGetAllBrandCategory),
        fork(watchAddBrandCategory),
        fork(watchDeleteBrandCategory),
        fork(watchUpdateBrandCategory),
        fork(watchGetAllCategoriesDropdown),
        fork(watchGetAllBrandCategoryAdmin),
        fork(watchGetAllBrandCategoriesByAdmin),
    ]);
}
