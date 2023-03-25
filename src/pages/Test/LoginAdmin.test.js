import { describe, test, expect } from "@jest/globals";
import Renderer from "react-test-renderer";
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
