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

const SupportAccountSlice = createSlice({
  name: "support-account",
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

    getSupportAccountList: (state, { payload }) => {},

    setSupportAccountList: (state, { payload }) => {
      state.list = payload;
    },

    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },

    getSupportAccountById: (state, { payload }) => {},
    setSupportAccountById: (state, { payload }) => {
      state.detail = payload;
    },
  },
});

const SupportAccountReducer = SupportAccountSlice.reducer;
export default SupportAccountReducer;

export const SupportAccountActions = SupportAccountSlice.actions;
export const SupportAccountSelectors = {
  list: (state) => state.supportAccount.list,
  pagination: (state) => state.supportAccount.pagination,
  detail: (state) => state.supportAccount.detail,
};
