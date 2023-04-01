import { describe, test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../store";
import CarForm from "../CarForm";

describe("Test component CarForm", () => {
  test("it should be render label name", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CarForm />
        </BrowserRouter>
      </Provider>
    );

    const wrapperName = screen.getByTestId("wrapper-labelName");
    const labelName = screen.getByTestId("label-Name");
    const labelSpanName = screen.getByTestId("label-SpanName");

    expect(labelName).toBeVisible();
    expect(wrapperName).toContainElement(labelName);
    expect(labelName).toContainElement(labelSpanName);
  });

  test("it should be render label price", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CarForm />
        </BrowserRouter>
      </Provider>
    );

    const wrapperPrice = screen.getByTestId("wrapper-labelPrice");
    const labelPrice = screen.getByTestId("label-Price");
    const labelSpanPrice = screen.getByTestId("label-SpanPrice");

    expect(labelPrice).toBeVisible();
    expect(wrapperPrice).toContainElement(labelPrice);
    expect(labelPrice).toContainElement(labelSpanPrice);
  });

  test("it should be render label photo", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CarForm />
        </BrowserRouter>
      </Provider>
    );

    const wrapperPhoto = screen.getByTestId("wrapper-Photo");
    const labelPhoto = screen.getByTestId("label-Photo");
    const labelSpanPhoto = screen.getByTestId("label-SpanPhoto");

    expect(labelPhoto).toBeVisible();
    expect(wrapperPhoto).toContainElement(labelPhoto);
    expect(labelPhoto).toContainElement(labelSpanPhoto);
  });

  test("it should be render label category", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CarForm />
        </BrowserRouter>
      </Provider>
    );

    const wrapperCategory = screen.getByTestId("wrapper-Category");
    const labelCategory = screen.getByTestId("label-Category");
    const labelSpanCategory = screen.getByTestId("label-SpanCategory");

    expect(labelCategory).toBeVisible();
    expect(wrapperCategory).toContainElement(labelCategory);
    expect(labelCategory).toContainElement(labelSpanCategory);
  });
});
