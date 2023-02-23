import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import swal from "sweetalert";
import auth from "../../firebase.config";

const initialState = {
  user: {
    email: "",
    role: "",
  },
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const userInfo = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userInfo.user.email;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${email}`);
  const data = await res.json();

  if (data.status) {
    return data;
  }
  return email;
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, navigate }) => {
    const userInfo = await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    return userInfo.user.email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user.email = "";
      state.isLoading = false;
      state.isError = "";
      state.error = "";
    },

    userAuthChange: (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
    googleLogin: (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = { ...state.user, email: action.payload };
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user.email = "";
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = { email: action.payload };
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user.email = "";
        state.error = action.error.message;

        if (state.error) {
          swal({
            title: "Wrong Password!",
            text: "Your password is Wrong Please Try agin!",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.user = "";
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload.status) {
          state.user = action.payload.data;
        } else {
          state.user = { ...state.user, email: action.payload };
        }
        state.error = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = "";
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, userAuthChange, googleLogin } = authSlice.actions;

export default authSlice.reducer;
