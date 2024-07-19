import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  },
  detail: undefined,
};

const LocalServerSlice = createSlice({
  name: "local-server",
  initialState,
  reducers: {
    create: (state, { payload }) => {},
    update: (state, { payload }) => {},
    delete: (state, { payload }) => {},

    resetSession: (state) => {
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },

    getLocalServerList: (state, { payload }) => {},

    setLocalServerList: (state, { payload }) => {
      state.list = payload;
    },

    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },

    getLocalServerById: (state, { payload }) => {},
    setLocalServerById: (state, { payload }) => {
      state.detail = payload;
    },
  },
});

const LocalServerReducer = LocalServerSlice.reducer;
export default LocalServerReducer;

export const LocalServerActions = LocalServerSlice.actions;
export const LocalServerSelectors = {
  list: (state) => state.localServer.list,
  pagination: (state) => state.localServer.pagination,
  detail: (state) => state.localServer.detail,
};
