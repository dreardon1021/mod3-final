import { orders } from './orders'

describe('orders', () => {
  it('should return the intial state', () => {
    const expectedResult = []
    const result = orders(undefined, [])
    expect(result).toEqual(expectedResult)
  })

  it('when recieving a SET_ORDERS action, it should return an array of orders', () => {
    const sampleAction = {
      type: 'SET_ORDERS',
      orders: [{order: 1}, {order: 2}, {order: 3}]
    }

    const sampleOrders = [{order: 1}, {order: 2}, {order: 3}]

    const result = orders([], sampleAction);
    expect(result).toEqual(sampleOrders)
  })

  it('when recieving a ADD_ORDER action, it should return an array of orders', () => {
    const sampleAction = {
      type: 'ADD_ORDER',
      order: [
        {
        "id": 1,
        "name": "Pat",
        "ingredients": [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno"
          ]
        }
      ]
    }

    const sampleOrder = [
      {
      "id": 1,
      "name": "Pat",
      "ingredients": [
        "beans",
        "lettuce",
        "carnitas",
        "queso fresco",
        "jalapeno"
        ]
      }
    ]

    const result = orders([], sampleAction);
    expect(result).toEqual(sampleOrder)
  })
})