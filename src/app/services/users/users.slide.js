import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isBlur: false,
  isInit: false,
  list: [],
  pagination: {
    page: 1,
    pageSize: 5,
    totalPage: 1,
    total: 0
  },
  currentUser: null,
  error: null, 
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBlur: (state, action) => {
      state.isBlur = action.payload;
    },
    setInit: (state, action) => {
      state.isInit = action.payload;
    },
    setUserList: (state, action) => {
      state.list = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setUserById: (state, action) => {
      state.currentUser = action.payload;
    },
    getUserList: (state, action) => {},
    getUserById: (state, action) => {},
    delete: (state, action) => {},
    create: (state, action) => {},
    update: (state, action) => {},
    resetSession: (state) => {
      return initialState;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
}); 

const UserReducer = UserSlice.reducer;
export default UserReducer;

export const UserActions = UserSlice.actions;

export const UserSelectors = {
  isLoading: (state) => state.user.isLoading,
  isBlur: (state) => state.user.isBlur,
  isInit: (state) => state.user.isInit,
  list: (state) => state.user.list,
  pagination: (state) => state.user.pagination,
  currentUser: (state) => state.user.currentUser,
  error: (state) => state.user.error,
};