import produce from 'immer';
import { GET_ALL_SUBADMIN_LIST_SUCCESS } from './constants';

const INITIAL_STATE = {
    subAdminList: []
};

const subAdminReducer = produce((draft, action) => {
    switch (action.type) {
        case GET_ALL_SUBADMIN_LIST_SUCCESS:
            draft.subAdminList = action.payload;
            break;

        default:
    }
}, INITIAL_STATE);

export default subAdminReducer;
