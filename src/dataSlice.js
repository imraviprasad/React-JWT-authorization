import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: [],
};

const dataSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    addJWT: (state, { payload }) => {
      state.jwt[0] = payload;
    },
    logOut: (state, { payload }) => {
      state.jwt[0] = payload;
    }
  },
});

export const { addJWT } = dataSlice.actions;
export const { logOut } = dataSlice.actions;
export const getJWT = (state) => state.jwt.jwt[0];
export default dataSlice.reducer;
