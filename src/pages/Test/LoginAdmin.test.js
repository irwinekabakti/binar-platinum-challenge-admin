import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import LoginAdmin from "../LoginAdmin";

describe("UI LoginAdmin test", () => {
  test("UI LoginAdmin should match snapshot", () => {
    const snapshot = Renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <LoginAdmin />
        </BrowserRouter>
      </Provider>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe("Test component login Admin", () => {
  test("it should be render title", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginAdmin />
        </BrowserRouter>
      </Provider>
    );

    const titleLoginAdmin = screen.getByTestId("title-Login");
    expect(titleLoginAdmin).toHaveTextContent("Welcome, Admin BCR");
  });
});

describe("Test component form loginAdmin", () => {
  test("change form input icon", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginAdmin />
        </BrowserRouter>
      </Provider>
    );

    const btnPassword = screen.getByTestId("type-button-password");

    expect(btnPassword).toHaveAttribute("type", "password");
  });
});
