import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.username;

export const loginUser = (userdata) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    if (response.ok) {
      // const data = await response.json();
      console.log(userdata);
      // console.log(data)
      dispatch(loginSuccess(userdata));
    } else {
      dispatch(loginFailure());
      console.log("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    dispatch(loginFailure());
  }
};

export default authSlice.reducer;
