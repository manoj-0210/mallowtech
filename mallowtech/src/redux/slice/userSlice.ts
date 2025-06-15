import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  userdetail: any;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  page: 1,
  userdetail: null,
};
const accessToken = localStorage.getItem("auth_token");
// GET users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (pagenumber: any) => {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${pagenumber}`,
      {
        headers: {
          "x-api-key": "reqres-free-v1",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data;
  }
);

// CREATE user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser: Omit<User, "id">) => {
    const response = await axios.post("https://reqres.in/api/users", newUser, {
      headers: {
        "x-api-key": "reqres-free-v1",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id: number) => {
      await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: {
          "x-api-key": "reqres-free-v1",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return id; // return the id for reducer to remove from store
    }
  );

// EDIT (update) user
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, updatedUser }: { id?: any; updatedUser: Partial<User> }) => {
    const response = await axios.put(
      `https://reqres.in/api/users/${id}`,
      updatedUser,
      {
        headers: {
          "x-api-key": "reqres-free-v1",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
    //   .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
    //     state.users = state.users.filter((user) => user.id !== action.payload);
    //   });
  },
});

export default userSlice.reducer;
