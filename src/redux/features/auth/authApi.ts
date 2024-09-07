import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tag-types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    logoutOtherUser: builder.mutation({
      query: (deviceId: string) => ({
        url: `/auth/logout-other-user/${deviceId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getMe: builder.query({
      query: () => ({
        url: `/user/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutUserMutation,
  useLogoutOtherUserMutation,
  useGetMeQuery,
} = authApi;
