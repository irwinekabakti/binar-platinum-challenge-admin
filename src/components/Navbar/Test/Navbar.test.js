import { describe, test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../store";
import NavbarAdmin from "../Navbar";

describe("test component navbar", () => {
  test("per component burger button custom", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavbarAdmin />
        </BrowserRouter>
      </Provider>
    );

    const containerBurgerBtn = screen.getByTestId(
      "container-burger-button-custom"
    );
    const navbarBurgerCustom = screen.getByTestId("burger-button-custom");

    expect(containerBurgerBtn).toContainElement(navbarBurgerCustom);
  });
});
