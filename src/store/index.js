import { configureStore } from "@reduxjs/toolkit";

import authAdminSlice from "./action/admin-slice";
import dashboardSlice from "./action/dashboard-slice";

export const store = configureStore({
  reducer: {
    adminStore: authAdminSlice.reducer,
    dashboardStore: dashboardSlice.reducer,
  },
});
