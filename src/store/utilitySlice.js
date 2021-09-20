import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  status: "",
  errors: [],
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    toogleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const utilityActions = utilitySlice.actions;

export default utilitySlice.reducer;
