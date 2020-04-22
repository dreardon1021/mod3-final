export const orders = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_ORDERS':
      return action.orders;
    case 'ADD_ORDER':
      return [...state, ...action.order];
    case 'DELETE_ORDER':
      let orderToDelete = state.find(order => order.id === action.orderId)
      console.log(orderToDelete)
      state.splice(state.indexOf(orderToDelete))
      return [...state];
    default:
      return state;
  }
};
