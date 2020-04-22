import * as actions from '../actions';

describe('Action Creators', () => {
  it('should have a type of SET_ORDERS and a correct payload', () => {
    const expectedAction = {
      type: 'SET_ORDERS',
      orders: [{id: 1, name: 'X', ingredients: ["ingredient1"]}]
    }

    const result = actions.setOrders([{id: 1, name: 'X', ingredients: ["ingredient1"]}])
    expect(result).toEqual(expectedAction)
  })

  it('should have a type of ADD_ORDER and a correct payload', () => {
    const expectedAction = {
      type: 'ADD_ORDER',
      order: [{id: 2, name: 'Y', ingredients: ["ingredient2"]}]
    }

    const result = actions.addOrder([{id: 2, name: 'Y', ingredients: ["ingredient2"]}])
    expect(result).toEqual(expectedAction)
  })
})