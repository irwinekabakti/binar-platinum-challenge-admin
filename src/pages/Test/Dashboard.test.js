import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderWithProviders } from "../../utils/test-utils";
import { store } from "../../store";
import Dashboard from '../Dashboard'

jest.mock("chart.js")
jest.mock("react-chartjs-2")

describe("UI Dashboard Test", () => {
  test("UI Dashboard should match snapshot", () => {
    const snapshot = Renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    ).toJSON()

    expect(snapshot).toMatchSnapshot()
  })
})

describe('Test component Dashboard', () => {
  test('it should be rendered', async () => {
    renderWithProviders(<Dashboard />)

    const containerDashboard = screen.getByTestId('container-Dashboard')
    expect(containerDashboard).toBeVisible()

  })
})

