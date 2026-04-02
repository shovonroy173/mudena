import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    accessToken: null,
    isAuthenticated: false,
    showLoginAd: false,
    forgotEmail: null,
    forgotOtp: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;

      if (typeof accessToken === "string" && accessToken.trim().length > 0) {
        state.accessToken = accessToken;
        state.token = accessToken;
      }

      if (user !== undefined) {
        state.user = user;
      }

      state.isAuthenticated = true;
    },

    setResetEmail: (state, action) => {
      state.forgotEmail = action.payload;
    },

    setResetOtp: (state, action) => {
      state.forgotOtp = action.payload;
    },

    setLoginAdPending: (state, action) => {
      state.showLoginAd = Boolean(action.payload);
    },

    clearLoginAdPending: (state) => {
      state.showLoginAd = false;
    },

    clearResetData: (state) => {
      ((state.forgotEmail = null), (state.forgotOtp = null));
    },

    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.showLoginAd = false;
      state.player_type = null;
    },
  },
});

export const {
  setToken,
  setUser,
  clearAuth,
  setCredentials,
  setResetEmail,
  setResetOtp,
  clearResetData,
  setLoginAdPending,
  clearLoginAdPending,
} = authReducer.actions;

export default authReducer.reducer;
