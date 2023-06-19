import axios from 'utils/axios';
import { all, fork, put, takeLatest, select } from 'redux-saga/effects';
import { makeSelectAuthToken } from 'store/Selector';
import {
  getAllNft,
  getAllNftSuccess,
  getAllNftSuperAdmin,
  getAllNftSuccessUser,
  getAllNftSuccessSuperAdmin,
  getNftBuyerSuccess,
  getsbtTokenSuccess,
  getsbtToken
} from './actions';
import {
  GET_ALL_NFT,
  ADD_NFT,
  MINT_NFT,
  LAZY_MINT_NFT,
  REQUEST_NFT_FOR_MINTING,
  GET_ALL_NFT_SUPER_ADMIN,
  GET_ALL_NFT_USER,
  EDIT_NFT,
  DELETE_NFT,
  REJECT_NFT,
  REJECT_EDIT_NFT,
  APPROVE_EDIT_NFT,
  BUY_NFT,
  RESELL_NFT,
  REDEEM_NFT,
  ADD_DELIVERY_NFT,
  GET_NFT_BUYER,
  REQUEST_CHANGE_NFT,
  CHANGE_TOKEN_ID,
  GET_EDITED_NFT_DATA,
  UPDATE_NFT_DYNAMIC_METADATA,
  ADD_SBTTOKEN,
  GET_ALL_SBTTOKEN,
  EDIT_REQUEST_NFT
} from './constants';
import { sagaErrorHandler } from 'shared/helperMethods/sagaErrorHandler';
import { setNotification } from 'shared/helperMethods/setNotification';

function* updateNftDynamicMetaDataRequest({ payload }) {
  const formData = new FormData();

  formData.append('id', payload.id);
  formData.append('asset', payload.asset);
  formData.append('name', payload.name);
  formData.append('price', payload.price);
  formData.append('currencyType', payload.currencyType);
  formData.append('description', payload.description);
  formData.append('quantity', payload.quantity);
  formData.append('mintType', payload.mintType);
  formData.append('metaData', JSON.stringify(payload.metaData));
  formData.append('metaFiles', JSON.stringify(payload.metaFiles));
  formData.append('tokenUri', payload.tokenUri);

  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/nft/dynamicMetaDataNftUpdate`, formData, headers);

    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    // payload.setLoader(false);
  }
}

export function* watchUpdateNftDynamicMetaData() {
  yield takeLatest(UPDATE_NFT_DYNAMIC_METADATA, updateNftDynamicMetaDataRequest);
}

function* getEditedNftDataRequest({ payload }) {
  const formData = new FormData();
  if (payload.isFile) {
    formData.append('asset', payload.asset);
  }
  formData.append('name', payload.name);
  formData.append('price', payload.price);
  formData.append('currencyType', payload.currencyType);
  formData.append('description', payload.description);
  formData.append('quantity', payload.quantity);
  formData.append('metaData', JSON.stringify(payload.metaDataArray));
  formData.append('mintType', payload.mintType);
  formData.append('fileNameArray', JSON.stringify(payload.fileNameArray));
  formData.append('previousUploadedItems', JSON.stringify(payload.previousUploadedItems));
  formData.append('brandId', JSON.stringify(payload.brandId));
  for (let i = 0; i < payload.fileArray.length; i++) {
    formData.append('fileArray', payload.fileArray[i]);
  }

  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`/nft/getUpdatedNftData/${payload.id}`, formData, headers);
    payload.handleDynamicMetaData(response.data.data);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    // payload.setLoader(false);
  }
}

export function* watchGetEditedNftData() {
  yield takeLatest(GET_EDITED_NFT_DATA, getEditedNftDataRequest);
}

function* deleteNftRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.delete(`nft/brandAdmin/${payload.id}`, headers);
    yield put(
      getAllNft({
        categoryId: payload.categoryId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type,
        brandId: payload.brandId
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchDeleteNft() {
  yield takeLatest(DELETE_NFT, deleteNftRequest);
}

function* getAllNftSuperAdminRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(
      `/nft/admin?page=${payload.page}&size=${payload.limit}&search=${payload.search}&brandId=${payload.brandId}&categoryId=${payload.categoryId}&type=${payload.type}`,
      headers
    );

    yield put(getAllNftSuccessSuperAdmin(response.data.data));
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* getAllNftUserRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(`/users/nfts/` + payload.walletAddress, headers);
    yield put(getAllNftSuccessUser(response.data.data));
    // console.log('good');
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* getNftBuyerRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(
      `/users/nfts/check/` + payload.walletAddress + '/' + payload.NftId + '/' + payload.NFTTokenId,
      headers
    );
    yield put(getNftBuyerSuccess(response.data.data));
    // console.log('goooooooooood')
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchGetNftBuyer() {
  yield takeLatest(GET_NFT_BUYER, getNftBuyerRequest);
}
export function* watchGetAllNftSuperAdmin() {
  yield takeLatest(GET_ALL_NFT_SUPER_ADMIN, getAllNftSuperAdminRequest);
}
export function* watchGetAllNftUser() {
  yield takeLatest(GET_ALL_NFT_USER, getAllNftUserRequest);
}

function* editNftRequest({ payload }) {
  const formData = new FormData();
  if (payload.isFile) {
    formData.append('asset', payload.asset);
  }
  formData.append('name', payload.name);
  formData.append('price', payload.price);
  formData.append('currencyType', payload.currencyType);
  formData.append('description', payload.description);
  formData.append('quantity', payload.quantity);
  formData.append('metaData', JSON.stringify(payload.metaDataArray));
  formData.append('mintType', payload.mintType);
  formData.append('fileNameArray', JSON.stringify(payload.fileNameArray));
  formData.append('previousUploadedItems', JSON.stringify(payload.previousUploadedItems));
  for (let i = 0; i < payload.fileArray.length; i++) {
    formData.append('fileArray', payload.fileArray[i]);
  }
  console.log(formData, 'formData');
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`nft/brandAdmin/updateNFT/${payload.id}`, formData, headers);
    yield put(
      getAllNft({
        categoryId: payload.categoryId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type,
        brandId: payload.brandId
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}

export function* watchEditNft() {
  yield takeLatest(EDIT_NFT, editNftRequest);
}

function* editRequestNftRequest({ payload }) {
  const formData = new FormData();
  // if (payload.isFile) {
  //     formData.append('asset', payload.asset);
  // }

  formData.append('metaData', JSON.stringify(payload.metaDataArray));

  formData.append('fileNameArray', JSON.stringify(payload.fileNameArray));
  formData.append('previousUploadedItems', JSON.stringify(payload.previousUploadedItems));
  for (let i = 0; i < payload.fileArray.length; i++) {
    formData.append('fileArray', payload.fileArray[i]);
  }
  console.log(formData, 'formData');
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`editNftMetaDataRequest/${payload.id}`, formData, headers);
    yield put(
      getAllNft({
        categoryId: payload.categoryId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type,
        brandId: payload.brandId
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}
export function* watchEditRequestNft() {
  yield takeLatest(EDIT_REQUEST_NFT, editRequestNftRequest);
}

function* addNftRequest({ payload }) {
  const formData = new FormData();
  formData.append('asset', payload.asset);
  formData.append('name', payload.name);
  formData.append('requesterAddress', payload.requesterAddress);
  formData.append('contractAddress', payload.contractAddress);
  formData.append('price', payload.price);
  formData.append('currencyType', payload.currencyType);
  formData.append('description', payload.description);
  formData.append('directBuyerAddress', payload.directBuyerAddress);
  formData.append('isDirectTransfer', payload.isDirectTransfer);
  formData.append('categoryId', payload.categoryId);
  formData.append('quantity', payload.quantity);
  formData.append('metaData', JSON.stringify(payload.metaDataArray));
  formData.append('mintType', payload.mintType);
  formData.append('fileNameArray', JSON.stringify(payload.fileNameArray));
  for (let i = 0; i < payload.fileArray.length; i++) {
    formData.append('fileArray', payload.fileArray[i]);
  }
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/nft/brandAdmin`, formData, headers);
    yield put(
      getAllNft({
        categoryId: payload.categoryId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type,
        brandId: payload.brandId
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}

function* buyNftRequest({ payload }) {
  try {
    let data = {
      nftId: payload.nftId,
      nftToken: payload.nftToken,
      buyerAddress: payload.buyerAddress,
      serialId: payload.serialId,
      contractAddress: payload.contractAddress,
      status: 'Buy'
    };

    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/users/nftOperation`, data, headers);
    yield setNotification('success', response.data.message);
    payload.buyNftResolve();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* resellNftRequest({ payload }) {
  try {
    let data = {
      nftId: payload.nftId,
      nftToken: payload.nftToken,
      buyerAddress: payload.buyerAddress,
      contractAddress: payload.contractAddress,
      status: 'Resell',
      rprice: payload.rprice
    };

    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/users/nftOperation`, data, headers);
    yield setNotification('success', response.data.message);
    payload.resellNftResolve();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}

function* redeemNftRequest({ payload }) {
  try {
    let data = {
      nftId: payload.nftId,
      nftToken: payload.nftToken,
      buyerAddress: payload.buyerAddress,
      contractAddress: payload.contractAddress,
      status: 'Redeem'
    };

    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/users/nftOperation`, data, headers);
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}
function* addDeliveryNftRequest({ payload }) {
  try {
    let data = {
      NftId: payload.NftId,
      tokenId: payload.TokenId.toString(),
      walletAddress: payload.WalletAddress,
      status: payload.status,
      UserId: payload.UserId
    };

    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/addDelivery`, data, headers);
    yield setNotification('success', response.data.message);
    payload.redeemNftResolve();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}

export function* watchAddNft() {
  yield takeLatest(ADD_NFT, addNftRequest);
}
export function* watchBuyNft() {
  yield takeLatest(BUY_NFT, buyNftRequest);
}
export function* watchResellNft() {
  yield takeLatest(RESELL_NFT, resellNftRequest);
}
export function* watchRedeemNft() {
  yield takeLatest(REDEEM_NFT, redeemNftRequest);
}
export function* watchAddDeliveryNft() {
  yield takeLatest(ADD_DELIVERY_NFT, addDeliveryNftRequest);
}

function* getAllNftRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(
      `/nft/brandAdmin?page=${payload.page}&size=${payload.limit}&search=${payload.search}&categoryId=${payload.categoryId}&brandId=${payload.brandId}&type=${payload.type}`,
      headers
    );
    yield put(getAllNftSuccess(response.data.data));
  } catch (error) {
    yield sagaErrorHandler(error);
  }
}

export function* watchGetAllNft() {
  yield takeLatest(GET_ALL_NFT, getAllNftRequest);
}

function* requestNftForMintingRequest({ payload }) {
  let data = {
    profitAmount: payload.profitAmount
  };
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.patch(`nft/brandAdmin/mintRequest/${payload.id}`, data, headers);

    yield put(
      getAllNft({
        categoryId: payload.categoryId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type,
        brandId: payload.brandId
      })
    );
    yield setNotification('success', response.data.message);
    payload.handleClose();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

function* requestChangeTokenId({ payload }) {
  try {
    let data = {
      tokenId: payload.tokenId
    };

    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`update/nftToken/${payload.id}`, data, headers);

    // yield put(
    //     getAllNft({
    //         categoryId: payload.categoryId,
    //         search: payload.search,
    //         page: payload.page,
    //         limit: payload.limit,
    //         type: payload.type,
    //         brandId: payload.brandId
    //     })
    // );
    yield setNotification('success', response.data.message);
  } catch (error) {
    // console.log('error', error);
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchChangeTokenId() {
  yield takeLatest(CHANGE_TOKEN_ID, requestChangeTokenId);
}
export function* watchRequestNftForMinting() {
  yield takeLatest(REQUEST_NFT_FOR_MINTING, requestNftForMintingRequest);
}

function* lazyMintNftRequest({ payload }) {
  let data = {
    minterAddress: payload.minterAddress,
    nftDataArray: JSON.stringify(payload.nftDataArray),
    tokenIdArray: JSON.stringify(payload.tokenIdArray)
  };
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`nft/admin/lazyMint`, data, headers);

    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    yield setNotification('success', response.data.message);
    payload.handleClose();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchLazyMintNft() {
  yield takeLatest(LAZY_MINT_NFT, lazyMintNftRequest);
}

function* mintNftRequest({ payload }) {
  const formData = new FormData();
  formData.append('nftDataArray', JSON.stringify(payload.nftDataArray));
  formData.append('tokenIdArray', JSON.stringify(payload.tokenIdArray));
  formData.append('minterAddress', payload.minterAddress);

  formData.append('transactionHash', payload.transactionHash);
  formData.append('signerAddress', payload.signerAddress);

  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`nft/admin/mint`, formData, headers);
    payload.handleClose();
    console.log('success');
    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    yield setNotification('success', response.data.message);
    payload.handleClose();
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchMintNft() {
  yield takeLatest(MINT_NFT, mintNftRequest);
}

function* rejectNftRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.patch(`nft/admin/mintReject/${payload.id}`, {}, headers);
    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchRejectNft() {
  yield takeLatest(REJECT_NFT, rejectNftRequest);
}
function* rejectEditNftRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`/nft/rejectEditMetaDataRequest/${payload.id}`, {}, headers);
    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchRejectEditNft() {
  yield takeLatest(REJECT_EDIT_NFT, rejectEditNftRequest);
}
function* approveEditNftRequest({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.put(`/nft/approveEditRequest/${payload.id}`, {}, headers);
    yield put(
      getAllNftSuperAdmin({
        categoryId: payload.categoryId,
        brandId: payload.brandId,
        search: payload.search,
        page: payload.page,
        limit: payload.limit,
        type: payload.type
      })
    );
    payload.handleClose();
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}

export function* watchApproveEditNft() {
  yield takeLatest(APPROVE_EDIT_NFT, approveEditNftRequest);
}
function* addSbtTokenSaga({ payload }) {
  console.log('000000000000', payload);
  const formData = new FormData();
  // formData.append('asset', payload.asset);
  formData.append('tokenName', payload.tokenName);
  formData.append('address', payload.address);
  formData.append('brandSymbol', payload.brandSymbol);
  formData.append('metaData', JSON.stringify(payload.metaData));

  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.post(`/addsoulbound`, formData, headers);
    yield put(
      getsbtToken({
        page: payload.page,
        limit: payload.limit
      })
    );
    payload.handleClose();
    // payload.setAddNftOpen(false);

    console.log('testing');
    yield setNotification('success', response.data.message);
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
    payload.setLoader(false);
  }
}
export function* watchTokenSaga() {
  yield takeLatest(ADD_SBTTOKEN, addSbtTokenSaga);
}
function* getsbtTokenSaga({ payload }) {
  try {
    const headers = { headers: { Authorization: `Bearer ${yield select(makeSelectAuthToken())}` } };
    const response = yield axios.get(`/getsoulbound?page=${payload.page}&size=${payload.limit}`, headers);

    yield put(getsbtTokenSuccess(response.data.data));
  } catch (error) {
    yield sagaErrorHandler(error.response.data.data);
  }
}
export function* watchsbtListSaga() {
  yield takeLatest(GET_ALL_SBTTOKEN, getsbtTokenSaga);
}
export default function* nftSaga() {
  yield all([
    fork(watchGetAllNft),
    fork(watchGetAllNftSuperAdmin),
    fork(watchGetAllNftUser),
    fork(watchAddNft),
    fork(watchBuyNft),
    fork(watchResellNft),
    fork(watchRedeemNft),
    fork(watchAddDeliveryNft),
    fork(watchMintNft),
    fork(watchLazyMintNft),
    fork(watchRequestNftForMinting),
    fork(watchEditNft),
    fork(watchRejectEditNft),
    fork(watchEditRequestNft),
    fork(watchDeleteNft),
    fork(watchRejectNft),
    fork(watchGetNftBuyer),
    fork(watchChangeTokenId),
    fork(watchGetEditedNftData),
    fork(watchUpdateNftDynamicMetaData),
    fork(watchTokenSaga),
    fork(watchsbtListSaga),
    fork(watchApproveEditNft)
  ]);
}
