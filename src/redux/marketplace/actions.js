import {
    GET_ALL_MARKETPLACE_CATEGORIES,
    GET_ALL_MARKETPLACE_CATEGORIES_SUCCESS,
    GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY,
    GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY_SUCCESS,
    GET_ALL_SIMILAR_PRODUCTS,
    GET_ALL_SIMILAR_PRODUCTS_SUCCESS,
    TRACKING_TOOL,
    TRACKING_TOOL_SUCCESS,
} from './constants';


export const getAllSimilarProducts = (data) => {
    return {
        type: GET_ALL_SIMILAR_PRODUCTS,
        payload: data
    };
};

export const getAllSimilarProductsSuccess = (data) => {
    return {
        type: GET_ALL_SIMILAR_PRODUCTS_SUCCESS,
        payload: data
    };
};
export const getTrack = (data) => {
    return {
        type: TRACKING_TOOL,
        payload: data
    };
};

export const getTrackSuccess = (data) => {
    return {
        type: TRACKING_TOOL_SUCCESS,
        payload: data
    };
};




export const getAllMarketplaceCategories = () => {
    return {
        type: GET_ALL_MARKETPLACE_CATEGORIES,
       
    };
};

export const getAllMarketplaceCategoriesSuccess = (data) => {
    return {
        type: GET_ALL_MARKETPLACE_CATEGORIES_SUCCESS,
        payload: data
    };
};

export const getAllMarketplaceNftsByCategory = (data) => {
    return {
        type: GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY,
        payload: data
    };
};

export const getAllMarketplaceNftsByCategorySuccess = (data) => {
    return {
        type: GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY_SUCCESS,
        payload: data
    };
};
