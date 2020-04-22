import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OrderForm from "./OrderForm";
import "@testing-library/jest-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { getOrders } from '../../apicalls'
jest.mock('../../apicalls');

describe("OrderForm", () => {
  it("should render what we expect", () => {
    const store = createStore(rootReducer)

    const mockOrders = [
      {
        id: 1,
        name: 'X',
        ingredients: [1, 2, 3]
      },
      {
        id: 2,
        name: 'Y',
        ingredients: [4, 5, 6]
      }
    ]

    getOrders.mockResolvedValueOnce(mockOrders)

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
          <OrderForm/>
      </Provider>
    )

    expect(getByPlaceholderText("Name")).toBeInTheDocument()
    expect(getByText("beans")).toBeInTheDocument()
    expect(getByText("steak")).toBeInTheDocument()
    expect(getByText("carnitas")).toBeInTheDocument()
    expect(getByText("sofritas")).toBeInTheDocument()
    expect(getByText("Submit Order")).toBeInTheDocument()
    expect(getByText("Order: Nothing selected")).toBeInTheDocument()
  })

  it("Should be able to add ingredients to an order being inputed", () => {
    const store = createStore(rootReducer)

    const mockOrders = [
      {
        id: 1,
        name: 'X',
        ingredients: [1, 2, 3]
      },
      {
        id: 2,
        name: 'Y',
        ingredients: [4, 5, 6]
      }
    ]

    getOrders.mockResolvedValueOnce(mockOrders)

    const {getByText} = render(
      <Provider store={store}>
          <OrderForm/>
      </Provider>
    )

    fireEvent.click(getByText("beans"))

    expect(getByText("Order: beans")).toBeInTheDocument()
  })

  it("should be able to submit an order and clear for next order", () => {
    const store = createStore(rootReducer)

    const mockOrders = [
      {
        id: 1,
        name: 'X',
        ingredients: [1, 2, 3]
      },
      {
        id: 2,
        name: 'Y',
        ingredients: [4, 5, 6]
      }
    ]

    getOrders.mockResolvedValueOnce(mockOrders)

    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
          <OrderForm />
      </Provider>
    )

    fireEvent.click(getByText("beans"))
    fireEvent.change(getByPlaceholderText("Name"), {target: {value: 'Z'}})
    fireEvent.click(getByText("Submit Order"))

    expect(getByText("Order: Nothing selected")).toBeInTheDocument()
  })
})