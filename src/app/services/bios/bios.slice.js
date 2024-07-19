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

const BioSlice = createSlice({
  name: "bio",
  initialState,
  reducers: {
    resetSession: (state) => {
      state.pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0,
      };
    },

    getBioList: (state, { payload }) => {},

    setBioList: (state, { payload }) => {
      state.list = payload;
    },

    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },
  },
});

const BioReducer = BioSlice.reducer;
export default BioReducer;

export const BioActions = BioSlice.actions;
export const BioSelectors = {
  list: (state) => state.bio.list,
  pagination: (state) => state.bio.pagination,
};
