// import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

import { usersApi } from "../../app/services/users";
import { RootState } from "../../app/store";
// import { User } from "@prisma/client";
type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  isBlocked: boolean;
  createdAt: Date;
};

interface InitialState {
  users: User[] | null;
}

const initialState: InitialState = {
  users: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.users = action.payload;
      }
    );
  },
});

export default slice.reducer;

export const selectUsers = (state: RootState) => state.users;
