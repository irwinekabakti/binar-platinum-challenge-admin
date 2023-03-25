import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_API from "../../api/BASE_API";

const initialState = {
  dashboardData: [],
  dataCars: [],
};

const tableDashboard = createAsyncThunk("dataTable/dashboard", async () => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
      params: {
        // created_at: "",
        page: 1,
        pageSize: 50,
      },
    };
    const dashboardAdmin = await axios.get(
      `${BASE_API}/admin/v2/order`,
      config
    );
    return dashboardAdmin.data.orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const carsDashboard = createAsyncThunk("get/Cars", async () => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
      params: {
        size: 1,
        pageSize: 10,
      },
    };
    const getResponse = await axios.get(`${BASE_API}/customer/v2/car`, config);
    return getResponse.data.cars;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const deletedCarDashboard = createAsyncThunk("delete/cars", async (payload) => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
    };
    const response = await axios.delete(
      `https://bootcamp-rent-cars.herokuapp.com/admin/car/${payload}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const dashboardSlice = createSlice({
  name: "dataDashboard",
  initialState,
  reducers: {
    getTableDashboard(action, state) {
      state.dashboardData = action.payload;
    },
    getCarsDashboard(state, action) {
      state.dataCars = action.payload;
    },
    deleteCar(state, action) {
      state.dataCars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tableDashboard.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
    });
    builder.addCase(carsDashboard.fulfilled, (state, action) => {
      state.dataCars = action.payload.map((item) => {
        return {
          ...item,
          category: item.category.toLowerCase(),
        };
      });
    });
    builder.addCase(deletedCarDashboard.fulfilled);
  },
});

export const { getTableDashboard, getUpdateCar, getCarsDashboard } =
  dashboardSlice.actions;

export { tableDashboard, carsDashboard, deletedCarDashboard };

export default dashboardSlice;
