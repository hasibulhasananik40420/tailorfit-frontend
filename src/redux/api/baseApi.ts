/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../features/tag-types";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api/v1",
  baseUrl: "https://api.tailorfitapp.com/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("result.error.data.message");
  }
  // if (result?.error?.status === 503) {
  //   console.log("আপনার নেটওয়ার্ক চেক করুন, একটু পরে আবার চেষ্টা করুন");
  // }
  if (result?.error?.status === 404) {
    console.log("result.error.data.message");
  }

  if (result?.error?.status === 401) {
    //* Send Refresh
    const res = await fetch(
      "https://api.tailorfitapp.com/api/v1/auth/refresh-token",
      // "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data?.data) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { tagTypesList } from "../features/tag-types";
// import { RootState } from "../features/store";

// const baseQuery = fetchBaseQuery({
//   // baseUrl: "http://localhost:5000/api/v1",
//   baseUrl: "https://api.tailorfitapp.com/api/v1",

//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;

//     if (token) {
//       headers.set("authorization", `${token}`);
//     }

//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: baseQuery,
//   endpoints: () => ({}),
//   tagTypes: tagTypesList,
// });
