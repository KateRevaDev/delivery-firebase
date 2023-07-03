import * as types from "./types"

export const getShops = (payload) => {
    return { type: types.SAGA_GET_SHOPS, payload };
}

export const getGoods = (payload) => {
    return { type: types.SAGA_GET_GOODS, payload };
}

export const addShop = (payload) => {
    return { type: types.SAGA_ADD_SHOP, payload };
}

export const addGood = (payload) => {
    return { type: types.SAGA_ADD_GOOD, payload };
}

export const setCurrentShop = (payload) => {
    return { type: types.SET_CURRENT_SHOP, payload };
}

export const addToCart = (payload) => {
    return { type: types.ADD_TO_CART, payload };
}

export const removeItemFromCart = (payload) => {
    return { type: types.REMOVE_ITEM_FROM_CART, payload };
}

export const updateOrder = (payload) => {
    return { type: types.UPDATE_ORDER, payload };
}

export const createOrder = (payload) => {
    return { type: types.SAGA_CREATE_ORDER, payload };
}
