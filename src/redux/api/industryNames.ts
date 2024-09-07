import { tagTypes } from "../features/tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCreateIndustry: builder.mutation({
      query: (userInfo) => ({
        url: "/industry-name/create-industry-name",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.industryName],
    }),

    //get costumer

    getMyIndustryName: builder.query({
      query: (admin) => ({
        url: `industry-name/my-industry-name/${admin}`,
        method: "GET",
      }),
      providesTags: [tagTypes.industryName],
    }),
  }),
});

export const { useCreateCreateIndustryMutation, useGetMyIndustryNameQuery } =
  authApi;
