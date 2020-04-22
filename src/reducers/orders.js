export const orders = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.orders;
    case 'ADD_ORDER':
      console.log(action)
      return [...state, ...action.order]
    default:
      return state;
  }
};
