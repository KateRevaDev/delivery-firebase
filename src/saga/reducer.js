import * as types from "./types";

const initialState = {
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
  userInfo: {
    isAdmin: true,
    email: '',
  },
};

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  const data = action.payload;
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
    case types.SAGA_REMOVE_PRODUCT_SUCCESS:
      return { ...state, goods: state.goods.filter(item => item.id !== data.id) };
    case types.SAGA_CREATE_ORDER_SUCCESS:
      return {
        ...state, order: {
          name: "",
          email: "",
          phone: "",
          address: "",
          goods: [],
          total: 0,
        },
        orderCreated: true,
      };
    case types.RESET_CART:
      return {
        ...state, order: {
          name: "",
          email: "",
          phone: "",
          address: "",
          goods: [],
          total: 0,
        },
        orderCreated: false,
      };
    case types.UPDATE_USERINFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, email: data.email },
      };
    default:
      return state;
  }
}

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
export const selectOrderQuantity = (state) => {
  let orderQuantity = 0;
  state.order?.goods.map(item => {
    orderQuantity += item.quantity;
  });
  return orderQuantity;
};

