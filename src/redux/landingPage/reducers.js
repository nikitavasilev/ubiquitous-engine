import produce from 'immer';
import { GET_ALL_LANDING_PAGE_DATA_SUCCESS , GET_NFT_DATA_SUCCESS , BMW_SUCCESS} from './constants';

const INITIAL_STATE = {
    landingPageData: [],
    nft:[],
    bmwData:[]
};

const landingPageReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_LANDING_PAGE_DATA_SUCCESS:
            draft.landingPageData = action.payload;
            break;
        case GET_NFT_DATA_SUCCESS:
            draft.nft = action.payload;
            break;
        case BMW_SUCCESS:
            draft.bmwData = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default landingPageReducer;
