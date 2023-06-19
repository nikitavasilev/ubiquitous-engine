import { combineReducers } from 'redux';
import customizationReducer from './themeReducers/customizationReducer';
import snackbarReducer from './themeReducers/snackbarReducer';
import cartReducer from './themeReducers/cartReducer';
import kanbanReducer from './themeReducers/kanbanReducer';
import AuthReducer from 'redux/auth/reducers';
import brand from 'redux/brand/reducers';
import category from 'redux/categories/reducers';
import subAdminReducer from 'redux/subAdmin/reducers';
import brandadminReducer from 'redux/brandAdmin/reducers';
import brandCategoryReducer from 'redux/brandCategory/reducers';
import nftReducer from 'redux/nftManagement/reducers';
import landingPageReducer from 'redux/landingPage/reducers';
import marketplaceReducer from 'redux/marketplace/reducers';
import delivery from 'redux/deliveryDashboard/reducers';
// import editProfileReducer from 'redux/profile/reducers';

const rootReducer = combineReducers({
  customization: customizationReducer,
  snackbar: snackbarReducer,
  cart: cartReducer,
  kanban: kanbanReducer,
  auth: AuthReducer,
  brand: brand,
  category: category,
  subAdminReducer: subAdminReducer,
  brandadminReducer: brandadminReducer,
  brandCategoryReducer: brandCategoryReducer,
  nftReducer: nftReducer,
  landingPageReducer: landingPageReducer,
  marketplaceReducer: marketplaceReducer,
  delivery: delivery,
  // editProfileReducer: editProfileReducer,
});

export default rootReducer;
