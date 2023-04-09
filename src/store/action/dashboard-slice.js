import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_API from "../../api/BASE_API";

const initialState = {
  chartOrder: [],
  dashboardData: [],
  dataCars: [],
  detailCar: [],
};

const chartDashboard = createAsyncThunk("chart/order", async (payload) => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
      params: {
        from: payload.from,
        until: payload.until,
      },
    };

    const response = await axios.get(`${BASE_API}/admin/order/reports`, config);

    return response.data;
  } catch (error) {
    throw error;
  }
});

const tableDashboard = createAsyncThunk(
  "dataTable/dashboard",
  async ({ sort, page, pageSize }) => {
    try {
      const config = {
        headers: {
          access_token: localStorage.getItem("token_Admin"),
        },
        params: {
          sort: sort,
          page: page,
          pageSize: pageSize,
        },
      };
      const dashboardAdmin = await axios.get(
        `${BASE_API}/admin/v2/order`,
        config
      );

      return dashboardAdmin.data.orders;
    } catch (error) {
      throw error;
    }
  }
);

const carsDashboard = createAsyncThunk("get/Cars", async () => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
      params: {
        page: 1,
        pageSize: 50,
      },
    };
    const getResponse = await axios.get(`${BASE_API}/admin/v2/car`, config);

    return getResponse.data.cars;
  } catch (error) {
    throw error;
  }
});

const uploadedCarDashboard = createAsyncThunk(
  "upload/cars",
  async (payload) => {
    try {
      const config = {
        headers: {
          access_token: localStorage.getItem("token_Admin"),
        },
      };
      let formData = new FormData();
      formData.append("name", payload.name);
      formData.append("category", payload.category);
      formData.append("price", payload.price);
      formData.append("image", payload.image);
      const postResponseCar = await axios.post(
        `${BASE_API}/admin/car`,
        formData,
        config
      );

      return postResponseCar.data;
    } catch (error) {
      throw error;
    }
  }
);

const detailCarDashboard = createAsyncThunk("detail/car", async (payload) => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
    };

    const detailCar = await axios.get(
      `${BASE_API}/admin/car/${payload}`,
      config
    );

    return detailCar.data;
  } catch (error) {
    throw error;
  }
});

const editedCarDashboard = createAsyncThunk("edit/cars", async (payload) => {
  try {
    const config = {
      headers: {
        access_token: localStorage.getItem("token_Admin"),
      },
    };

    let formData = new FormData();
    formData.append("name", payload.name);
    formData.append("category", payload.category);
    formData.append("price", payload.price);
    formData.append("image", payload.image);

    const editResponseCar = await axios.put(
      `${BASE_API}/admin/car/${payload.id}`,
      formData,
      config
    );

    return editResponseCar.data;
  } catch (error) {
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
    throw error;
  }
});

const dashboardSlice = createSlice({
  name: "dataDashboard",
  initialState,
  reducers: {
    getChartDashboard(action, state) {
      state.chartOrder = action.payload;
    },
    getTableDashboard(action, state) {
      state.dashboardData = action.payload;
    },
    getCarsDashboard(state, action) {
      state.dataCars = action.payload;
    },
    postCarsDashboard(state, action) {
      state.dataCars = action.payload;
    },
    getDetailCarDashboard(state, action) {
      state.detailCar = action.payload;
    },
    editCarsDashboard(state, action) {
      state.dataCars = action.payload;
    },
    deleteCar(state, action) {
      state.dataCars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chartDashboard.fulfilled, (state, action) => {
      state.chartOrder = action.payload;
    });
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
    builder.addCase(uploadedCarDashboard.fulfilled, (state, action) => {});
    builder.addCase(detailCarDashboard.fulfilled, (state, action) => {
      state.detailCar = action.payload;
    });
    builder.addCase(editedCarDashboard.fulfilled, (state, action) => {});
    builder.addCase(deletedCarDashboard.fulfilled, (state, action) => {});
  },
});

export const {
  getChartDashboard,
  getTableDashboard,
  getCarsDashboard,
  postCarsDashboard,
  getDetailCarDashboard,
  editCarsDashboard,
  deleteCar,
} = dashboardSlice.actions;

export {
  chartDashboard,
  tableDashboard,
  carsDashboard,
  uploadedCarDashboard,
  detailCarDashboard,
  editedCarDashboard,
  deletedCarDashboard,
};

export default dashboardSlice;
