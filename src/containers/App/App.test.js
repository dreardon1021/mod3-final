import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { getOrders } from '../../apicalls'
jest.mock('../../apicalls');

describe("App", () => {
  it("Should render what we expect", async () => {
    const store = createStore(rootReducer)

      const mockOrders = [
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
        },
        {
        "id": 2,
        "name": "Sam",
        "ingredients": [
          "steak",
          "pico de gallo",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno"
          ]
        }
      ]

    getOrders.mockResolvedValueOnce(mockOrders)

    const {getByText, getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
          <App/>
      </Provider>
    )

    const order1El = await waitFor(() => getByText("Pat"))
    const order2El = await waitFor(() => getByText("Sam"))
    const ingredient1El = await waitFor(() => getByTestId("Pat beans"))


    expect(order1El).toBeInTheDocument()
    expect(order2El).toBeInTheDocument()
    expect(getByPlaceholderText("Name")).toBeInTheDocument()
    expect(ingredient1El).toBeInTheDocument()
  })

  it("can add an order", async () => {
    const store = createStore(rootReducer)

      const mockOrders = [
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
        },
        {
        "id": 2,
        "name": "Sam",
        "ingredients": [
          "steak",
          "pico de gallo",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno"
          ]
        }
      ]

    getOrders.mockResolvedValueOnce(mockOrders)

    const {getByText, getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
          <App/>
      </Provider>
    )

    fireEvent.click(getByText("beans"))
    fireEvent.change(getByPlaceholderText("Name"), {target: {value: 'Dan'}})
    fireEvent.click(getByText("Submit Order"))

    const newNameEl = await waitFor(() => getByText("Dan"))
    const newIngredientEl = await waitFor(() => getByTestId("Dan beans"))

    expect(newNameEl).toBeInTheDocument()
    expect(newIngredientEl).toBeInTheDocument()
  })
})
