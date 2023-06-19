import produce from 'immer';
import {
    GET_ALL_MARKETPLACE_CATEGORIES_SUCCESS,
    GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY_SUCCESS,
    GET_ALL_SIMILAR_PRODUCTS_SUCCESS,
    TRACKING_TOOL_SUCCESS
} from './constants';

const INITIAL_STATE = {
    marketplaceCategories: [],
    marketplaceNfts: [],
    similarProductNfts: [],
    trackNft: [],
};

const marketplaceReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_MARKETPLACE_CATEGORIES_SUCCESS:
            draft.marketplaceCategories = action.payload;
            break;
        case TRACKING_TOOL_SUCCESS:
            draft.trackNft = action.payload;
            break;
        case GET_ALL_MARKETPLACE_NFTS_BY_CATEGORY_SUCCESS:
            draft.marketplaceNfts = action.payload;
            break;
        case GET_ALL_SIMILAR_PRODUCTS_SUCCESS:
            draft.similarProductNfts = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default marketplaceReducer;
