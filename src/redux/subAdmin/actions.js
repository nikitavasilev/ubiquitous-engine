import {
    GET_ALL_SUBADMIN_LIST,
    GET_ALL_SUBADMIN_LIST_SUCCESS,
    ADD_SUBADMIN,
    UPDATE_SUBADMIN,
    DELETE_SUBADMIN,
    CHANGE_SUBADMIN_STATUS,
    CHANGE_SUBADMIN_MINTING_ACCESS,
    CHANGE_ROLE,
    ASSIGN_BRANDCATEGORY
} from './constants';

// Admin

export const getAllSubAdminList = (data) => {
    return {
        type: GET_ALL_SUBADMIN_LIST,
        payload: data
    };
};

export const getAllSubAdminListSuccess = (data) => {
    return {
        type: GET_ALL_SUBADMIN_LIST_SUCCESS,
        payload: data
    };
};

export const addSubAdmin = (data) => {
    return {
        type: ADD_SUBADMIN,
        payload: data
    };
};

export const updateSubAdmin = (data) => {
    return {
        type: UPDATE_SUBADMIN,
        payload: data
    };
};
export const assignBrandCategory = (data) => {
    return {
        type: ASSIGN_BRANDCATEGORY,
        payload: data
    };
};


export const deleteSubAdmin = (data) => {
    return {
        type: DELETE_SUBADMIN,
        payload: data
    };
};
export const changeSubAdminStatus = (data) => {
    return {
        type: CHANGE_SUBADMIN_STATUS,
        payload: data
    };
};
export const changeRole = (data) => {
    return {
        type: CHANGE_ROLE,
        payload: data
    };
};

export const changeSubAdminMintingAccess = (data) => {
    return {
        type: CHANGE_SUBADMIN_MINTING_ACCESS,
        payload: data
    };
};
