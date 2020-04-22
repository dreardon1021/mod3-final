export const setOrders = orders => ({
  type: 'SET_ORDERS',
  orders
});

export const addOrder = order => ({
  type: 'ADD_ORDER',
  order
})

export const deleteRedux = orderId => ({
  type: 'DELETE_ORDER',
  orderId
})

