import produce from 'immer';
import { GET_ALL_NFT_SUCCESS, GET_ALL_NFT_SUPER_ADMIN_SUCCESS, GET_ALL_NFT_USER_SUCCESS, GET_NFT_BUYER_SUCCESS, GET_ALL_SBTTOKEN_SUCCESS } from './constants';

const INITIAL_STATE = {
    nftList: [],
    nftListSuperAdmin: [],
    nftListUser: [],
    nftBuyer: {},
    sbtList: {},
};

const nftReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_NFT_SUCCESS:
            draft.nftList = action.payload;

            break;

        case GET_ALL_NFT_SUPER_ADMIN_SUCCESS:
            draft.nftListSuperAdmin = action.payload;
            break;

        case GET_ALL_NFT_USER_SUCCESS:
            draft.nftListUser = action.payload;
            break;

        case GET_NFT_BUYER_SUCCESS:
            draft.nftBuyer = action.payload;
            break;

        case GET_ALL_SBTTOKEN_SUCCESS:
            draft.sbtList = action.payload;
            break;
        default:
    }
}, INITIAL_STATE);

export default nftReducer;
