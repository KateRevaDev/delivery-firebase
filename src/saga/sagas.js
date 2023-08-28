import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../api/queries'
import * as types from './types'
import { v4 as uuidv4 } from 'uuid';

function* getShops() {
  try {
    const shops = yield call(api.getShops_fb);
    yield put({ type: types.SAGA_GET_SHOPS_SUCCESS, payload: shops });
    if (shops.length) {
      yield put({ type: types.SET_CURRENT_SHOP, payload: shops[0] });
    }
  } catch (e) {
    yield put({ type: types.SAGA_GET_SHOPS_FAIL, message: e.message });
  }
}

function* addShop(action) {
  const { shopName } = action.payload;
  try {
    const shop = yield call(api.addShop_fb, { id: uuidv4(), name: shopName });
    yield put({ type: types.SAGA_ADD_SHOP_SUCCESS, payload: shop })
  } catch (e) {
    yield put({ type: types.SAGA_ADD_SHOP_FAIL, message: e.message })
  }
}

function* getGoods(action) {
  const { id } = action.payload;
  try {
    const goods = yield call(api.getGoods_fb, id);
    yield put({ type: types.SAGA_GET_GOODS_SUCCESS, payload: goods })
  } catch (e) {
    yield put({ type: types.SAGA_GET_GOODS_FAIL, message: e.message })
  }
}

function* addGood(action) {
  const { name, price, shopId, description, image } = action.payload;
  try {
    const good = yield call(api.addGood_fb, { id: uuidv4(), name, price, shopId, description, image });
    yield put({ type: types.SAGA_ADD_GOOD_SUCCESS, payload: good })
  } catch (e) {
    yield put({ type: types.SAGA_ADD_GOOD_FAIL, message: e.message })
  }
}

function* createOrder(action) {
  const order = action.payload;
  try {
    const payload = yield call(api.createOrder_fb, { id: uuidv4(), order });
    yield put({ type: types.SAGA_CREATE_ORDER_SUCCESS, payload })
  } catch (e) {
    yield put({ type: types.SAGA_CREATE_ORDER_FAIL, message: e.message })
  }
}

function* removeProduct(action) {
  try {
    const payload = yield call(api.removeProduct_fb, action.payload );
    yield put({ type: types.SAGA_REMOVE_PRODUCT_SUCCESS, payload })
  } catch (e) {
    yield put({ type: types.SAGA_REMOVE_PRODUCT_FAIL, message: e.message })
  }
}

function* registerUser(action) {
  try {
    const payload = yield call(api.registerUser_fb, action.payload );
    yield put({ type: types.SAGA_REGISTER_USER_SUCCESS, payload })
  } catch (e) {
    yield put({ type: types.SAGA_REGISTER_USER_FAIL, message: e.message })
  }
}

function* mySaga() {
  yield takeLatest(types.SAGA_GET_SHOPS, getShops)
  yield takeLatest(types.SAGA_ADD_SHOP, addShop)
  yield takeLatest(types.SAGA_GET_GOODS, getGoods)
  yield takeLatest(types.SAGA_ADD_GOOD, addGood)
  yield takeLatest(types.SAGA_CREATE_ORDER, createOrder)
  yield takeLatest(types.SAGA_REMOVE_PRODUCT, removeProduct)
  yield takeLatest(types.SAGA_REGISTER_USER, registerUser)
}

export default mySaga