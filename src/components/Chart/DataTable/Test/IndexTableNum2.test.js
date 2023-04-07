import { describe, test, expect } from "@jest/globals";
import { screen, waitFor } from "@testing-library/react";
import TableListOrder from "../IndexTableNum2";
import { renderWithProviders } from "../../../../utils/test-utils";

describe("Test component Table", () => {
  test("it should be render title dashboard", async () => {
    const { store } = renderWithProviders(<TableListOrder />);

    // eslint-disable-next-line no-console
    // console.log(store);

    const titleDashboard = screen.getByTestId("title-TableDashboard");

    await waitFor(
      () => {
        expect(titleDashboard).toBeVisible();
      },
      { timeout: 150000 }
    );

    await waitFor(
      () => {
        expect(titleDashboard).toHaveTextContent("Dashboard");
      },
      { timeout: 150000 }
    );
  });
});
