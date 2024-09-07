import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUser = {
  name: string;
  email: string;
  companyName: string;
  phonePrimary: string;
  phoneSecondary?: string;
  address?: string;
  profile?: string;
  role: string;
  iat: number;
  exp: number;
  deviceId?: string;
  id: string;
  membership: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  folderData: string | null; // Add folderData to the state
};

const initialState: TAuthState = {
  user: null,
  token: null,
  folderData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setFolderData: (state, action: PayloadAction<string>) => {
      state.folderData = action.payload;
    },

    clearFolderData: (state) => {
      state.folderData = null;
    },

    logout: (state) => {
      (state.user = null), (state.token = null), (state.folderData = null);
    },
  },
});

export const { setUser, updateUser, setFolderData, clearFolderData, logout } =
  authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
