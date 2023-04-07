import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderWithProviders } from "../../../utils/test-utils";
import { store } from "../../../store";
import GraphicCar from "../GraphicCar";

jest.mock("chart.js")
jest.mock("react-chartjs-2")

describe('Test component Graphic Car', () => {
  test('it should be renderer', () => {
    renderWithProviders(<GraphicCar />)

    const containerTitle = screen.getByTestId('container-Title')
    const title1 = screen.getByTestId('title-Dashboard')
    const title2 = screen.getByTestId('title-ChartDataVisualization')

    expect(containerTitle).toContainElement(title1)
    expect(containerTitle).toContainElement(title2)
  })
})
