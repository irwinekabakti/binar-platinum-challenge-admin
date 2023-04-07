import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderWithProviders } from "../../utils/test-utils";
import { store } from "../../store";
import CarFormPage from '../CarFormPage'

describe('UI CarFormPage Test', () => {
  test('UI UI CarFormPage should match snapshot', () => {
    const snapshot = Renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <CarFormPage />
        </BrowserRouter>
      </Provider>
    ).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})
