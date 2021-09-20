import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (loginCreds) => {
    const resp = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds),
    });
    const data = await resp.json();
    return data;
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const resp = await fetch("/logout", {
    method: "DELETE",
  });
  const data = await resp.json();
  return data;
});

export const userAutoLogin = createAsyncThunk(
  "user/userAutoLogin",
  async () => {
    const resp = await fetch("/profile");
    const data = await resp.json();
    return data;
  }
);

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (formData) => {
    const resp = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await resp.json();
    return data;
  }
);

const initialState = {
  user: null,
  board: [],
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
  extraReducers: {
    [userLogin.pending](state) {
      state.status = "pending";
    },
    [userLogin.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
        state.user = action.payload;
        state.errors = [];
      }
    },
    [userLogin.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [userLogout.pending](state) {
      state.status = "pending";
    },
    [userLogout.fulfilled](state, action) {
      state.status = "completed";
      // debugger;
      if (action.payload.errors) {
        state.errors = action.payload.errors;
      } else {
        // state.user = action.payload.user;
        state.user = null
        state.errors = action.payload.message;
      }
    },
    [userLogout.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [userAutoLogin.pending](state) {
      state.status = "pending";
    },
    [userAutoLogin.fulfilled](state, action) {
      state.status = "completed";
      // debugger;
      if (action.payload.errors){
        state.errors = action.payload.errors
      }else{
        state.user = action.payload;
        state.errors = [];
      }
    },
    [userAutoLogin.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [userSignup.pending](state) {
      state.status = "pending";
    },
    [userSignup.fulfilled](state, action){
      state.status = "completed"
      if (action.payload.errors){
        state.errors = action.payload.errors
      }else{
        state.user = action.payload
        state.errors = []
      }
    },
    [userSignup.rejected](state,action){
      state.status = "rejected"
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    }
  },
});

export const utilityActions = utilitySlice.actions;

export default utilitySlice.reducer;
