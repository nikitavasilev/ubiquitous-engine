import { GET_ALL_LANDING_PAGE_DATA, GET_ALL_LANDING_PAGE_DATA_SUCCESS, GET_NFT_DATA,GET_NFT_DATA_SUCCESS, BMW , BMW_SUCCESS } from './constants';

export const getAllLandingPageData = () => {
    return {
        type: GET_ALL_LANDING_PAGE_DATA
    };
};

export const getAllLandingPageDataSuccess = (data) => {
    return {
        type: GET_ALL_LANDING_PAGE_DATA_SUCCESS,
        payload: data
    };
};
export const getnftData = (data) => {
    return {
        type: GET_NFT_DATA,
        payload: data
    };
};

export const getnftDataSuccess = (data) => {
    return {
        type: GET_NFT_DATA_SUCCESS,
        payload: data
    };
};
export const bmwPage = (data) => {
    return {
        type: BMW,
        payload: data
    };
};

export const bmwPageSuccess = (data) => {
    return {
        type: BMW_SUCCESS,
        payload: data
    };
};
