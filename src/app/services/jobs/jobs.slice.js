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
  loading: false,
  error: null,
};

const JobSlice = createSlice({
  name: "job",
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

    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    getJobList: (state, { payload }) => {},

    setJobList: (state, { payload }) => {
      state.list = payload;
    },

    setPagination: (state, { payload }) => {
      state.pagination = payload;
    },

    getJobById: (state, { payload }) => {},
    setJobById: (state, { payload }) => {
      state.detail = payload;
    },
  },
});

const JobReducer = JobSlice.reducer;
export default JobReducer;

export const JobActions = JobSlice.actions;
export const JobSelectors = {
  list: (state) => state.job.list,
  pagination: (state) => state.job.pagination,
  detail: (state) => state.job.detail,
  error: (state) => state.user.error,
};
