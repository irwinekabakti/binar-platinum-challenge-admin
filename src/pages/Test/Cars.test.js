import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { renderWithProviders } from "../../utils/test-utils";
import { store } from "../../store";
import Cars from "../Cars";

describe('UI Cars Test', () => {
  test('UI Cars should match snapshot', () => {
    const snapshot = Renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Cars />
        </BrowserRouter>
      </Provider>
    ).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})

describe('Test component Cars', () => {
  test('it should be render component Cars', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cars />
        </BrowserRouter>
      </Provider>
    )

    const containerTitle = screen.getByTestId('container-Title')
    const titleCars = screen.getByTestId('title-Cars')
    const titleCars2 = screen.getByTestId('title-Cars-2')

    expect(containerTitle).toContainElement(titleCars)
    expect(containerTitle).toContainElement(titleCars2)

  })
})

