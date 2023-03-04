import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { idToken: null, isLoding: false };

const ValueSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    isLogin(state, action) {
      const item = action.payload;
      state.idToken = item;
      // state.isLoding = true;
    },
    isLogout(state) {
      state.idToken = null;
      // state.isLoding = false;
    },
  },
});

const store = configureStore({
  reducer: ValueSlice.reducer,
});

export const actionTaker = ValueSlice.actions;
export default store;
