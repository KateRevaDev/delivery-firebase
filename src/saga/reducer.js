import { createSlice } from "@reduxjs/toolkit";
import * as types from "./types";

const initialState = {
  // goods: [
  //   {
  //     _id: "647a0ed986ddf190cce32950",
  //     name: "apple",
  //     price: {
  //       $numberDecimal: "15",
  //     },
  //     shopId: "6479dc22b5fbb35def5625f6",
  //     __v: 0,
  //   },
  //   {
  //     _id: "647a3d955d47d83e4475d2f9",
  //     name: "pare",
  //     price: {
  //       $numberDecimal: "10",
  //     },
  //     shopId: "6479dc36b5fbb35def5625f9",
  //     __v: 0,
  //   },
  // ],
  // shops: [
  //   {
  //     _id: "6479dc22b5fbb35def5625f6",
  //     name: "METRO",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6479dc36b5fbb35def5625f9",
  //     name: "ATB",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6479e7687625989e5b3c2842",
  //     name: "FORA",
  //     __v: 0,
  //   },
  // ],
  goods: [],
  shops: [],
  order: {
    name: "",
    email: "",
    phone: "",
    address: "",
    goods: [],
    total: 0,
  },
  currentShop: null,
  isLoading: true,
  orderCreated: false,
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  const data = action.payload;
  console.log('data ', data);
  switch (action.type) {
    case types.SAGA_GET_SHOPS_SUCCESS:
      return { ...state, shops: data, isLoading: false };
    case types.SAGA_GET_GOODS_SUCCESS:
      return { ...state, goods: data, isLoading: false };
    case types.SET_CURRENT_SHOP:
      return { ...state, currentShop: data ? data : state.shops.length ? state.shops[0] : null };
    case types.ADD_TO_CART:
      return { ...state, order: addItemToCart(state, data) };
    case types.REMOVE_ITEM_FROM_CART:
      return { ...state, order: { ...state.order, goods: state.order.goods.filter(item => item !== data) } };
    case types.UPDATE_ORDER:
      let order;
      if (data.field === "quantity") {
        order = addItemToCart(state, data);
      } else {
        order = {
          ...state.order,
          [data.field]: data.value,
        };
      }
      return { ...state, order };
    default:
      return state;
  }
}

const mainSlice = createSlice({
  name: "mainReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const good = state.order.goods.find(
        (item) => item._id === action.payload._id
      );
      if (good) {
        state.order.goods = state.order.goods.map((item) =>
          item._id === good._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.order.goods.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.order.total = getTotalSum(state.order.goods);
    },
    removeItem: (state, action) => {
      state.order.goods = state.order.goods.filter(item => item._id !== action.payload._id);
      state.order.total = getTotalSum(state.order.goods);
    },
    updateOrderField: (state, action) => {
      if (action.payload.field === "quantity") {
        state.order.goods = state.order.goods.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.value }
            : item
        );
        state.order.total = getTotalSum(state.order.goods);
      } else {
        state.order = {
          ...state.order,
          [action.payload.field]: action.payload.value,
        };
      }
    },

    setInitialData: (state, action) => {
      console.log('setInitialData ', action.payload);
      // state.shops = action.payload[0];
      // state.goods = action.payload[1];
      // state.currentShop = action.payload[0][0];
      state.isLoading = false;
    },

    setOrderCreated: (state, action) => {
      state.orderCreated = action.payload.created;
      if (action.payload.created) {
        state.order = {
          name: "",
          email: "",
          phone: "",
          address: "",
          goods: [],
          total: 0,
        };
      }
    },

    setShops: (state, action) => {

      console.log('setShops action ', action);

    },

    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },

  },
});

const getTotalSum = (goods) => {
  let total = 0;
  goods.map((item) => {
    total += Number(item.quantity) * Number(item?.price || 0);
  });
  return total;
};

const addItemToCart = (state, data) => {

  const good = state.order.goods.find((item) => item.id === data.id);
  const order = { ...state.order };
  if (good) {
    order.goods = order.goods.map((item) =>
      item === good
        ? { ...item, quantity: data.value ? data.value : item.quantity + 1 }
        : item
    );
  } else {
    order.goods = [...order.goods, { ...data, quantity: 1 }];
  }
  order.total = getTotalSum(order.goods);

  return order;

}

// Selectors
export const selectGoods = (state) => state.goods || [];
export const selectOrder = (state) => state.order || {};
export const selectOrderCreated = (state) => state.orderCreated;
export const selectShops = (state) => state.shops || [];
export const selectIsLoading = (state) => state.isLoading;
export const selectCurrentShop = (state) => state.currentShop;
export const selectOrderQuantity = (state) => {
  let orderQuantity = 0;
  state.order?.goods.map(item => {
    orderQuantity += item.quantity;
  });
  return orderQuantity;
};

